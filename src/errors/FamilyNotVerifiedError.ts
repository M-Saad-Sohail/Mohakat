class FamilyNotVerifiedError extends Error {
  public notVerified: boolean;
  constructor() {
    super('FamilyNotVerifiedError')
    this.notVerified = false;
  }
}

export default FamilyNotVerifiedError;