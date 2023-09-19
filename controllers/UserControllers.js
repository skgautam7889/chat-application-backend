exports.newUser = async (req, res) =>{
    try {
        res.json({ data: req.body, status: "success1" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}