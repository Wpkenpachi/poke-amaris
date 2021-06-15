import * as bcrypt from 'bcrypt';

export const passwordHashing = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const passwordCompare = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
}