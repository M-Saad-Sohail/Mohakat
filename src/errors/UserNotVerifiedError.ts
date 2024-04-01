class UserNotVerifiedError extends Error {
  public notVerified: boolean;
  constructor() {
    super('UserNotVerified')
    this.notVerified = false;
  }
}

export default UserNotVerifiedError;