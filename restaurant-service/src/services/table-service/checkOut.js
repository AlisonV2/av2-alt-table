import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const checkOut = async (req, res) => {
    try {
        const { data } = await axios.post(`${process.env.TABLE_SERVICE_URL}/checkout`, req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({
            message: 'Error checking out',
        });
    }
};

export default checkOut;