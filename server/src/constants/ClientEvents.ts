import EventEmitter from 'events';

export const CLIENT_CREATED = 'client-created';
export const CLIENT_UPDATED = 'client-updated';
export const CLIENT_DELETED = 'client-deleted';

class ClientEmitter extends EventEmitter {}

const clientEmitter = new ClientEmitter();

export default clientEmitter;
