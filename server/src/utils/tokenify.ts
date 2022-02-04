import { ObjectId } from 'mongoose';
require('dotenv').config();

export module Tokenify {
  const jwt = require('jsonwebtoken');

  type TokenProps = {
    id: ObjectId;
  };

  type PayloadProps = TokenProps;

  export const tokenify = (user: TokenProps): string => {
    const payload: PayloadProps = {
      id: user.id,
    };

    return jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '7d' });
  };
}
