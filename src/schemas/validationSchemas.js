// src/schemas/validationSchemas.js
import * as Yup from 'yup';

// Phone number regex (supports Indian numbers and international format)
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid royal corporate/personal email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean()
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

export const inquirySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Valid phone number is required')
    .required('Phone number is required'),
  message: Yup.string()
    .min(10, 'Please provide more details (min 10 characters)')
    .required('Message is required')
});

export const appointmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Full name is required')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Valid contact number is required')
    .required('Contact number is required'),
  date: Yup.string()
    .required('Preferred viewing date is required'),
  time: Yup.string()
    .required('Preferred viewing time is required'),
  message: Yup.string()
});

export const paymentSchema = Yup.object().shape({
  cardholderName: Yup.string().when('paymentMethod', {
    is: (val) => val === 'card',
    then: () => Yup.string().min(3, 'Cardholder name is required').required('Cardholder name is required'),
    otherwise: () => Yup.string()
  }),
  cardNumber: Yup.string().when('paymentMethod', {
    is: (val) => val === 'card',
    then: () => Yup.string().matches(/^[0-9]{16}$/, 'Card number must be 16 digits').required('Card number is required'),
    otherwise: () => Yup.string()
  }),
  expiry: Yup.string().when('paymentMethod', {
    is: (val) => val === 'card',
    then: () => Yup.string().matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Format MM/YY').required('Expiry date is required'),
    otherwise: () => Yup.string()
  }),
  cvv: Yup.string().when('paymentMethod', {
    is: (val) => val === 'card',
    then: () => Yup.string().matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits').required('CVV is required'),
    otherwise: () => Yup.string()
  }),
  upiId: Yup.string().when('paymentMethod', {
    is: (val) => val === 'upi',
    then: () => Yup.string().matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Valid UPI ID (e.g. name@okhdfcbank) is required').required('UPI ID is required'),
    otherwise: () => Yup.string()
  })
});

export const contactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is required').required('Full name is required'),
  email: Yup.string().email('Valid email is required').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Valid phone is required').required('Phone is required'),
  subject: Yup.string().min(3, 'Subject is required').required('Subject is required'),
  message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required')
});

export const propertyFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title must be at least 5 characters').required('Property title is required'),
  propertyType: Yup.string().required('Property type is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  bookingAmount: Yup.number().positive('Booking amount must be positive').required('Booking amount is required'),
  status: Yup.string().required('Status is required'),
  bedrooms: Yup.number().min(0, 'Cannot be negative').required('Bedrooms count is required'),
  bathrooms: Yup.number().min(0, 'Cannot be negative').required('Bathrooms count is required'),
  area: Yup.number().positive('Area must be positive').required('Area in sq.ft is required'),
  location: Yup.string().required('City/Location is required'),
  address: Yup.string().required('Detailed address is required'),
  description: Yup.string().min(20, 'Description must be at least 20 characters').required('Description is required'),
  agentId: Yup.string().required('Assigned agent is required'),
  imageUrl: Yup.string().url('Must be a valid image URL').required('Main image URL is required')
});

export const agentFormSchema = Yup.object().shape({
  name: Yup.string().required('Agent name is required'),
  role: Yup.string().required('Role / Designation is required'),
  email: Yup.string().email('Valid email is required').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Valid phone is required').required('Phone is required'),
  experience: Yup.string().required('Experience is required'),
  location: Yup.string().required('Location is required'),
  specialization: Yup.string().required('Specialization is required'),
  bio: Yup.string().min(15, 'Bio is required').required('Bio is required'),
  image: Yup.string().url('Must be a valid image URL').required('Image URL is required')
});

export const customerFormSchema = Yup.object().shape({
  name: Yup.string().required('Customer name is required'),
  email: Yup.string().email('Valid email is required').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Valid phone is required').required('Phone is required'),
  address: Yup.string().required('Address is required'),
  status: Yup.string().required('Status is required')
});
