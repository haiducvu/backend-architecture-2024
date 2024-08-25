"use strict";

const StatusCode = {
    OK: 200,
    CREATED: 201,
};

const ReasonStatusCode = {
    CREATED: "Created",
    OK: "Success",
};

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonStatusCode.OK,
        metadata = {}
    }) {
        // this.message = !message ? reasonStatusCode : message;
        // (this.status = statusCode), (this.metadata = metadata);
        // [Update 28/07/2024]
        if (metadata?.message && metadata?.status || metadata?.errmsg) {
            this.message = metadata.message
            this.status = metadata.status || 500
            this.metadata = {}
        } else {
            this.message = message
            this.status = statusCode;
            this.metadata = metadata
        }
        // console.log('this', this)
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        options = {},
        message,
        statusCode = StatusCode.CREATED,
        reasonStatusCode = ReasonStatusCode.CREATED,
        metadata,
    }) {
        super({ message, statusCode, reasonStatusCode, metadata, options });
        this.options = options;
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse
};
