import { createContext } from "react";

/**
 * Context for managing user course preferences and media selections
 * throughout the language test application.
 *
 * This context is used to:
 * - Share user preferences between PretestQuestions and ContactUs components
 * - Store course type selections for personalized recommendations
 * - Track preferred learning media for better course matching
 * - Pass user data to contact forms for enhanced user experience
 */

// Default context values
const defaultContextValue = {
  course: [], // Array of selected course types/preferences
  media: [], // Array of selected learning media preferences
};

/**
 * MyContext - React Context for Course and Media Preferences
 *
 * @example
 * // Provider usage (in PretestQuestions.js):
 * <MyContext.Provider value={{ course: classOptions, media: courseMedia }}>
 *   {children}
 * </MyContext.Provider>
 *
 * @example
 * // Consumer usage (in ContactUs.js):
 * const { course, media } = useContext(MyContext);
 */
export const MyContext = createContext(defaultContextValue);
