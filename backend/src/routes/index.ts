import { Request, Response, Router } from 'express';
import path from 'path';
import { readCsv, castCsv , getCharts} from '../services/MessageService'

const router: Router = Router();
router.get('/', (req: Request, res: Response) => {
    res.send('sydpro backend');
});

router.get('/messages', (req, res) => {
    const filePath = path.join(__dirname, '../assets/code-challenge-01.csv');

    readCsv(filePath).then(data => {
        const csv = castCsv(data);
        res.json(csv);
    }, () => {
        res.json('Can not read csv file.');
    });
});

router.get('/charts', (req, res) => {
    const filePath = path.join(__dirname, '../assets/code-challenge-01.csv');

    readCsv(filePath).then(data => {
        const charts = getCharts(data);
        res.json(charts);
    }, () => {
        res.json('Can not read csv file.');
    });
});

export default router;
