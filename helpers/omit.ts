export function omit<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  keys.forEach((key) => {
    delete user[key];
  });

  return user;
}
