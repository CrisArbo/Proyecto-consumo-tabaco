import { db } from "@/prisma/db";

export const statsRepository = {
  countPersonsByGender() {
    return db.orm.public.Person.groupBy("genderId").aggregate((a) => ({ count: a.count() }));
  },

  countRespondentsByActivity() {
    return db.orm.public.Respondent.groupBy("mainActivityId").aggregate((a) => ({
      count: a.count(),
    }));
  },

  countTobaccoUseByAnswer() {
    return db.orm.public.TobaccoUse.groupBy("everSmokedId").aggregate((a) => ({
      count: a.count(),
    }));
  },

  countVapeUseByAnswer() {
    return db.orm.public.VapeUse.groupBy("everVapedId").aggregate((a) => ({
      count: a.count(),
    }));
  },
};
