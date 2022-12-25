import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
  score: Number,   // Number is shorthand for {type: Number}
  subject: String,
  name: String
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);
export default ScoreCard;
 