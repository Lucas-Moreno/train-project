export interface Express {
  use: (arg?: any, otherArg?: any) => any
  listen: (arg?: any, otherArg?: any) => any
}

export interface Router {
  get: (path?: string, params?: any) => void
  post: (path?: string, params?: any) => void
}

export interface Request {
  cookies?: Cookies
  user?: any
  body?: any
}

export interface Response {
  send: (text: string) => void
  status: (number: number) => any
  cookie: (jwt: string, token: string, durationCookie: DurationCookie) => any
  clearCookie: (token: string) => any
}

export interface Cookies {
  jwt: string
}

export interface DurationCookie {
  httpOnly: boolean
  maxAge: number
}