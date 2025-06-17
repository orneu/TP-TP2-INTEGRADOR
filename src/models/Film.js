import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genre: String,
  type: {
    type: String,
    enum: ['pelicula', 'serie'],
    required: true
  },
  duration: {
    type: Number, // minutos
    required: true
  },
  dateWatched: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Film', filmSchema);
