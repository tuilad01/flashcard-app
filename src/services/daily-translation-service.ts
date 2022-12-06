import { v4 as uuidv4 } from "uuid"
import { DailyTranslationSchema } from "../datastore/schemas/daily-translation-schema"

const dailyTranslationSchema = new DailyTranslationSchema();

// export type DailyTranslation = {
//     id: string,
//     vi: string,
//     myself?: string,
//     google?: string,
//     conclude?: string,
//     createdAt?: Date,
//     updatedAt?: Date
// }

export class DailyTranslation {
    id: string = "";
    vi: string = "";
    myself?: string;
    google?: string;
    conclude?: string;
    createdAt?: Date = new Date();
    updatedAt?: Date = new Date();
}


export const dailyTranslationService = {
    getAll: async function ({ month = 0, year = 0 }: { month?: number, year?: number }): Promise<DailyTranslation[]> {
        let data: DailyTranslation[] = []
        try {
            data = await dailyTranslationSchema.findAll() as DailyTranslation[]
            if (month && year) {
                data = data.filter(d => {
                    if (d.createdAt) {
                        const createdAt = new Date(d.createdAt)
                        const createdAtMonth = createdAt.getMonth()
                        const createdAtYear = createdAt.getFullYear()

                        if (month === createdAtMonth && year === createdAtYear) {
                            return true;
                        }
                    }
                    return false;
                })
            }
        } catch (error) {
            console.error(error)
        }

        return data
    },
    add: async function (form: any) {
        try {
            const dailyTrans = new DailyTranslation()
            dailyTrans.id = uuidv4();
            dailyTrans.vi = form.vi
            dailyTrans.myself = form.myself
            dailyTrans.google = form.google
            dailyTrans.conclude = form.conclude

            const newDailyTranslation = await dailyTranslationSchema.add(dailyTrans)
            return newDailyTranslation;
        } catch (error) {
            console.error(error)
        }

        return null;
    },
    update: async function (id: string, dailyTranslation: DailyTranslation) {
        try {
            const oldDailyTranslation = await dailyTranslationSchema.find({ id: id });
            if (oldDailyTranslation) {
                const update = {
                    vi: dailyTranslation.vi || "",
                    myself: dailyTranslation.myself || "",
                    google: dailyTranslation.google || "",
                    conclude: dailyTranslation.conclude || "",
                    updatedAt: new Date()
                }
                const result = await dailyTranslationSchema.update({ id: id }, update)
                return result;

            }
        } catch (error) {
            console.error(error)
        }

        return null;
    },
    remove: async function (id: string) {
        try {
            const oldDailyTranslation = await dailyTranslationSchema.find({ id: id });
            if (oldDailyTranslation) {
                
                const result = await dailyTranslationSchema.remove({ id: id })
                return result;

            }
        } catch (error) {
            console.error(error)
        }

        return 0;
    },
    import: async function (dailyTranslation: any) {
        try {
            delete dailyTranslation.key
            const newDailyTranslation = await dailyTranslationSchema.add(dailyTranslation)
            return newDailyTranslation;
        } catch (error) {
            console.error(error)
        }

        return null;
    },
}
