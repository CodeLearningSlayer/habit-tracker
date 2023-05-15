import Achievement from "../models/Achievement";
import Challenge from "../models/Challenge";

export const addChallenge = async (req, res) => {
    try {
        const {name, description} = req.body;

        const newChallenge = new Challenge({
            name,
            description,
            completed: false,
            startDate: Date.now()
        })
        await newChallenge.save() 
        await User.findByIdAndUpdate(req.params.id, {
            $push: {challenges: newChallenge}
        });
        res.json(newChallenge)
    } catch(e) {
        console.log(e);
        res.json({message: "Ошибка при попытке создания нового испытания"});
    }
}

export const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();

        res.json({
            challenges: challenges
        })
    }
    catch(e) {
        console.log(e.message);
        res.status(500).json({
            message: "No challenges retrieved"
        });
    }
}

export const deleteChallenge = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        const challengeIndex = Challenge.findIndex((challenge) => challenge.toString() === req.params.challengeId);
      
        if (challengeIndex === -1) {
          return res.status(404).json({
            message: "challenge not found",
          });
        }
      
        challenges.splice(challengeIndex, 1);
      
        await challenges.save();
      
        res.status(200).json({
          message: "Challenge deleted successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
}