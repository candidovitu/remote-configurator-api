import { DataError } from './DataErrorInterface';

export interface UseCaseResponse {
    success: boolean;
    data?: any;
    errors?: DataError[];
    statusCode?: number;
}

export interface UseCase {
    handle(...args: any[]): Promise<UseCaseResponse> | UseCaseResponse;
}