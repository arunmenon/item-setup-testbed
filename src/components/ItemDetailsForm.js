// src/components/ItemDetailsForm.js

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
} from '@mui/material';
// In ItemDetailsForm.js

import { Send } from '@mui/icons-material';

import { enrichItem } from '../services/api'; // Import the API function
import ModelResponses from './ModelResponses'; // Import from components folder
import '../styles/ItemDetailsForm.css';
import axios from 'axios';

const ItemDetailsForm = () => {
  const [itemTitle, setItemTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [itemProductType, setItemProductType] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/enrich-item', {
        item_title: itemTitle,
        short_description: shortDescription,
        long_description: longDescription,
        item_product_type: itemProductType,
      });
      setResponses(response.data);
    } catch (error) {
      console.error('Error submitting item details:', error);
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="progress-indicator">
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Generating AI enhanced content. Please wait...
        </Typography>
      </div>
    );
  }

  if (responses) {
    return (
      <ModelResponses
        responses={responses}
        itemProductType={itemProductType}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Typography variant="h4" gutterBottom className="form-title">
        Enrich Your Item
      </Typography>
      <TextField
        label="Item Title"
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Long Description"
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Product Type</InputLabel>
        <Select
          value={itemProductType}
          onChange={(e) => setItemProductType(e.target.value)}
        >
          {/* Replace with actual product types */}
          <MenuItem value="T-Shirts">T-Shirts</MenuItem>
          <MenuItem value="Summer Dresses">
            Women's Summer Dresses
          </MenuItem>
          {/* Add more product types as needed */}
        </Select>
      </FormControl>
      {error && (
        <Typography variant="body1" className="error-message">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="submit-button"
        endIcon={<Send />}
      >
        Submit
      </Button>
    </form>
  );
};

export default ItemDetailsForm;
