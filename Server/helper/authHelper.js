import bcrypt from 'bcrypt'


const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
    throw error; 
  }
}
export const comparePassword = async (password, hashedPassword) => {
    try {
      const isValid = await bcrypt.compare(password, hashedPassword);
      return isValid;
    } catch (error) {
      console.error(`Error comparing password: ${error}`);
      return false; 
    }
  };