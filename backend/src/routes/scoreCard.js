import { Router } from "express";
import ScoreCard from "../../models/ScoreCard.js";
import db from '../db.js';

db.connect()

const updateScoreCard = async (score, subject, name) => {
    await ScoreCard.updateOne({name:name},{
        $set:{subject:subject, score:score}
    });
    console.log("ScoreCard Updated")
}


const saveScoreCard = async (score, subject, name) => {
    
    try {
        const newScoreCard = new ScoreCard({ score, subject, name });
        console.log("Created ScoreCard", newScoreCard);
        return newScoreCard.save();
      } catch (e) {throw new Error("User creation error: " + e);}

};

const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
  } catch (e) { throw new Error("Database deletion failed"); }
};

// deleteDB();
const router = Router();

router.delete("/cards", (req, res)=>{
    deleteDB();
    res.json({message: "Database cleared"})
  });

router.post("/card", (req, res)=>{
    const existing = async() => {
        try{

            if(!req.body.score && !parseInt(req.body.score)){
                res.json({message: "Invalid Score! Input Again", card:0})
                throw new Error("Invalid Input")}
            const status = await ScoreCard.findOne({name: req.body.name, subject: req.body.subject}).limit(1);
            if (status){
                res.json({message:"Updating ( "+req.body.name+" , "+req.body.subject+" , "+req.body.score+" )",card:updateScoreCard(req.body.score, req.body.subject, req.body.name)})
                }
            else{
                res.json({message:"Adding ( "+req.body.name+" , "+req.body.subject+" , "+req.body.score+" )",card:saveScoreCard(req.body.score, req.body.subject, req.body.name)})
                }
            }catch(e){console.log("Invalid input !!")}
        
    }
    existing()
    
    //todo error判斷
});
  router.get("/cards", (req, res)=>{
    const searching = async(type, string) => {
      const status = await ScoreCard.find({[type]: string});
      console.log("search", status[1])
      if(!status[0]){
          res.json({message: type+" ( "+string+" ) not found !!"})
      }
      else{
          let msg = []
          msg = status.map(card => "Found card with "+type+ "( "+card.name+", "+card.subject+", "+card.score+" )")
          res.json({messages: msg})
      }

    }
    console.log("strrrrrrring", req.query.queryString)
    searching(req.query.type, req.query.queryString);

  });
  export default router;
 