// IMPORTANT NOTES - set everything below to be like this:
// httpOnly: false,
// sameSite: "lax",
// secure: false,
// ^^this allows the cookie to be set in browser on localhost:3000
// httpOnly: true OR false,
// sameSite: "none",
// secure: true,
// ^^that works for apollo studio
// httpOnly: true OR false,
// sameSite: "none",
// secure: false,
// ^^that works for postman --> make sure to delete existing cookie to reset

// prod:
// cookie: {
//   maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//   httpOnly: false,
//   sameSite: "lax", //must be hard coded -> none for apollo studio
//   secure: true, //must be hard coded -> true for apollo studio
// },

//  cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//       httpOnly: false,
//       sameSite: "lax", //must be hard coded -> none for apollo studio
//       secure: false, //must be hard coded -> true for apollo studio
//     },

//  cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//       httpOnly: false,
//       sameSite: "none", //must be hard coded -> none for apollo studio
//       secure: false, //must be hard coded -> true for apollo studio
//     },

//  cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//       httpOnly: false,
//       sameSite: "none", //must be hard coded -> none for apollo studio
//       secure: true, //must be hard coded -> true for apollo studio
//     },

// cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//       httpOnly: true,
//       sameSite: "lax", //must be hard coded -> none for apollo studio
//       secure: true, //must be hard coded -> true for apollo studio
//     },

// cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//       httpOnly: true,
//       sameSite: "strict", //must be hard coded -> none for apollo studio
//       secure: true, //must be hard coded -> true for apollo studio
//     },

// cookie: {
//   maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//   httpOnly: false,
//   sameSite: "strict", //must be hard coded -> none for apollo studio
//   secure: false, //must be hard coded -> true for apollo studio
// },

// cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//       httpOnly: true,
//       sameSite: "none", //must be hard coded -> none for apollo studio
//       secure: true, //must be hard coded -> true for apollo studio
//     },
