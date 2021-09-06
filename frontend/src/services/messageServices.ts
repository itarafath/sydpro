import {IChart, IReadCsv} from '@/types/IMessage';
import axios from '../request';
import {AxiosResponse} from "axios";


export default new class MessageServices {
    public async getMessage(): Promise<AxiosResponse<IReadCsv[]>> {
        return axios.get<IReadCsv[]>(`/messages`);
    }

    public async charts(): Promise<AxiosResponse<IChart>> {
        return axios.get<IChart>(`/charts`);
    }
}
