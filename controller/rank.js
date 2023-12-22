import Rank from "../model/Rank.js";

/* CREATE */
export const createRank = async (req, res) => {
  try {
    const uid = req.query.uid;
    const preRank = await Rank.find({ uid });
    if (preRank[0]) {
      const postRank = await Rank.findById(preRank[0]._id);
      postRank.exp = postRank.exp + 1;
      if ((parseInt(preRank.exp) % 50) == 0) {
        postRank.lvl = postRank.lvl + 1;
      }
      await postRank.save();

      const rank = await Rank.find({ uid });
      return res.status(201).json({ result: rank });
    } else {
      const lvl = 1;
      const exp = 1;
      const newRank = new Rank({
        uid,
        exp,
        lvl,
      });
      await newRank.save();

      const rank = await Rank.find({ uid });
      return res.status(201).json({ result: rank });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getRank = async (req, res) => {
  try {
    const uid = req.query.uid;
    const rank = await Rank.find({ uid });
    res.status(200).json({ result: rank });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
