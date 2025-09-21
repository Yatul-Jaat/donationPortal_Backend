import Receiver from "../model/reciever.model.js";

const addRequest = async (req, res) => {
  const { userId, name, description, location } = req.body;
  try {
    const request = new Receiver({
      userId,
      name,
      description,
      state: "pending",
      location,
    });
    await request.save();
    res.status(201).json({ message: "Request added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await Receiver.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    request.state = "deleted";
    await request.save();
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await Receiver.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found..." });
    }
    request.state = "approved";
    await request.save();
    res.status(200).json({ message: "Request approved successfully..." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const pendingRequests = async (req, res) => {
  try {
    const requests = await Receiver.find({ state: "deleted" })
    if (!requests) {
      return res.status(404).json({ message: "No rejected requests found" });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approvedRequests = async (req, res) => {
  try {
    const requests = await Receiver.find({ state: "approved" })
    if (!requests) {
      return res.status(404).json({ message: "No approved requests found" });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requestsByUserId = async (req, res) => {
  try {
    const { id } = req.body;
    const requests = await Receiver.find({ userId: id });
    if (!requests) {
      return res
        .status(404)
        .json({ message: "No requests found for this user" });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRequestData = async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await Receiver.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "No requests found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addRequest,
  deleteRequest,
  updateRequest,
  pendingRequests,
  approvedRequests,
  requestsByUserId,
  getRequestData,
};
