import logger from "../utils/loggers/logger.js";
import "../configs/config.js";

/** @Abstract */
export class BaseDao {

    constructor() {
        this.logger = logger;
        if (this.constructor === BaseDao) {
            throw new Error('Error')
        }
    }

    create() {
        throw new Error('Error')
    }

    getAll() {
        throw new Error('Error')
    }

    deleteById() {
        throw new Error('Error')
    }
}