import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  role: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || '',
    };
    super(options);
  }

  validate(payload: JwtPayload) {
    // to trafi do req.user
    return {
      user_id: payload.sub,
      role_id: payload.role,
    };
  }
}
