import Sim from "../model/Sim.js";

/* CREATE */
export const createSim = async (req, res) => {
  try {
    const ask = req.query.ask.toLowerCase();
    const answer = req.query.ans;
    const preSim = await Sim.find({ ask });
    if (preSim[0]) {
      const postSim = await Sim.findById(preSim[0]._id);
      postSim.ans.push(answer);
      await postSim.save();

      const sim = await Sim.find({ ask });
      return res.status(201).json({ result: sim });
    } else {
      const ans = [answer];
      const newSim = new Sim({
        ask,
        ans,
      });
      await newSim.save();

      const sim = await Sim.find({ ask });
      return res.status(201).json({ result: sim });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getSim = async (req, res) => {
  try {
    const ask = req.query.ask.toLowerCase();
    const sim = await Sim.find({ ask });
    res.status(200).json({ result: sim });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
