// src/components/ModelResponses.js

import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from '@mui/material';
import { submitFeedback } from '../services/api'; // Import the API function
import '../styles/ModelResponses.css'; // Import the CSS file
import axios from 'axios';

const ModelResponses = ({ responses, itemProductType }) => {
  const [selectedResponses, setSelectedResponses] = useState({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const tasks = [
    'title_enhancement',
    'short_description_enhancement',
    'long_description_enhancement',
  ];

  const handleSelection = (task, handlerName) => {
    setSelectedResponses((prev) => ({ ...prev, [task]: handlerName }));
  };

  const handleSubmitFeedback = async () => {
    const feedback = tasks.map((task) => ({
      task_type: task,
      winner_model: selectedResponses[task],
    }));

    try {
      await axios.post('http://localhost:5000/submit-feedback', {
        item_product_type: itemProductType,
        feedback,
      });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="thank-you-message">
        <Typography variant="h5">Thank you for your feedback!</Typography>
      </div>
    );
  }

  return (
    <div className="responses-container">
      <Typography variant="h4" gutterBottom>
        Review Model Responses
      </Typography>
      {tasks.map((task) => (
        <div key={task} className="task-section">
          <Typography variant="h6" gutterBottom className="task-title">
            {formatTaskName(task)}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              name={task}
              value={selectedResponses[task] || ''}
              onChange={(e) => handleSelection(task, e.target.value)}
            >
              {responses[task].map((responseItem, index) => (
                <Card
                  variant="outlined"
                  key={index}
                  className={`response-card ${
                    selectedResponses[task] === responseItem.handler_name ? 'selected' : ''
                  }`}
                >
                  <CardContent>
                    <FormControlLabel
                      value={responseItem.handler_name}
                      control={<Radio />}
                      label={
                        <div>
                          <Typography variant="subtitle1">
                            Model: {responseItem.model}
                          </Typography>
                          <Typography variant="body1">
                            {responseItem.response}
                          </Typography>
                        </div>
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        disabled={tasks.some((task) => !selectedResponses[task])}
        onClick={handleSubmitFeedback}
        className="feedback-button"
      >
        Submit Feedback
      </Button>
    </div>
  );
};
// Helper function to format task names
const formatTaskName = (task) => {
  return task
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default ModelResponses;
