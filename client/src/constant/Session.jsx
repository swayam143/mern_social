// StoredVariables
const StoredVariables = {
  logindata:
    "$2y$12$Sfgfr5xn80lXcy7Trr1Ix.8EZEd2/gGfp30OhEzOU13GDIWwZDeTC/$2y$12$Sfgfr5xn80lXcy7Trr1Ix.8EZEd2/gGfp.",
  username:
    "$12$Sfgfr5xn80lXcy7Trr1Ix.8EZEd20lXcy7Trr1Ix$///Gfp30OhEzOU13GDIWwZDeTC/$2y$12$Sfgfr$$Gfp30OhEzOU13GDIWwZDeTC/$2y$12$Sfgfr5",
  pathname:
    "$2y$12$Sfgfr5xn80lXcy7Trr1Ix.8EZEd2/gGfp30OhEzOU13GDIWwZDeTC/$2y$12$Sfgfr5xngfr5xn80lXcy7Trr1Ix$2y$12$Sf",
  role: "$12$Sfgfr5xn80lXcy7Trr1Ix.8EZEd20lfp30OhEzOU13GDIWwZDeTC/0OhEzOU13GDIWwZDeTC/$2y$12$Sfgfr5xngfr5xn80lXcy7Trr1Ix$2y$12$Sf",
  tabs: "$12$Sfgfr5xxn80lXcy7Trr1Ix$n80lXcy7Trr1Ix8Exn80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklflkd",
  isProvider:
    "$0lXcyXcy7Trr1Ix$ZEd207TrXcy7Trr1Xcy7Trr1Ix$ZEd20IXcy7Trr1Ix$ZEd20x$ZEdXcy7Trr1Ix$ZEd2020",
  productId:
    "$2y$12$Sfgfr5xn80lXcy7Trr1Ix.8EZEd2n80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklflkdr5xxn80lXc/y7T",
  email:
    "$2y$12$Sfgfr5xngfrr5xn80lXcy7Trr1Ix.8EZEd2n80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklfl",
  forgot:
    "$2y$12$Sfgfr5xngfrr5xn80fr5xn80lXcy7Trr1Ix8EZEd20lfp3lXcy7Trr8EZEd2n80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklfl",
  posttype:
    "$12$Sfgfr5xxn80lXcy7Trr1ngfrr5xn80fr5xn80lXcy7TIx$n80lXcy7Trr1Ix8Exn80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklflkd",
  product:
    "$n80lXcy7Trr1ngfrr5xn80fr5xn80lfgfr5xngfrr5xnXcy7TIx$n80lXcy7Trr1Ix8Exn80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklflkd",
  category:
    "$2a$10$jxLePXlMIocKlLvxzUsprOhGQI4RyoRt0jecHVX1Rf1/Tm5EA8jFKvxzUsprOhGQI4RyoRt0jecHVX1Rf1/Tm5EA8jFK",
  area: "$2a$10$jxLePXlMIocKlLvxzUsprOhGQI4RyoRt0jecHVX1Rf1/Tm5EA8jFKvxzUsprOhGQI4R2a$10$jxLePXlMIocKlLvxzUsprOhGQI4RyoRt0jecHVX1Rf1/Tm5EA8jFKvxzUsprOhGQI4R",
  FavData:
    "$2a$10$jxLePXlMIocKlLvxzUsprOhGQI4RyoRt0jecHVX1Rf1/Tm5EA8jFKvxzUsprOhGQI4R2a$10$jxLePXlMIocKlLvxzUsprOhGQI4RyoRt0jecHVX",
  maintenance:
    "$n80lXcy7Trr1ngfrr5xn80fr5xn80lfgfr5xtghtsdtrt657TIx$n80lXcy7Trr1Ix8Exn80lXcy7Trr1Ix$ZEd20lfp30Ohgfr5xxn80lXc/y7Trr1Ikkdklflkd",
  productImage:
    "ngfrr5xnjolkjfgfr5xngfrr5xnljljljlkjlkjgfr5xngfrr5xnXcy7TIx$n80lXxngfrr5xnjoi5xngfrrgfr5xngfrr",
  RememberMe:
    "MCgJDrpaOLCLPX9v2g62Jg==r5xngfrr5xnXcy7TIx$n80lX==MCgJDrpaOLCLPX9v2g62Jg==",
  password:
    "MCgJMCgJDrpaOLCLPX9v2g62Jg=$n80lX===r5xngfrr5xnXcy7TIxDrpaOLCLPX9v2g62Jg==",
};

// Session
export const SetSession = (key, data) => sessionStorage.setItem(key, data);
export const GetSession = (key) => sessionStorage.getItem(key);
export const RemoveSession = (key) => sessionStorage.removeItem(key);
export const ClearSession = (key) => sessionStorage.clear();
export const SetLocal = (key, data) => localStorage.setItem(key, data);
export const GetLocal = (key) => localStorage.getItem(key);

//Local Storage
export const SetLocalSession = (key, data) => localStorage.setItem(key, data);
export const GetLocalSession = (key) => localStorage.getItem(key);
export const RemoveLocalSession = (key) => localStorage.removeItem(key);

export default StoredVariables;
