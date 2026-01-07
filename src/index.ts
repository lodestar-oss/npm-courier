import * as z from "zod";

const parseResult = z.record(z.string(), z.string()).safeParse({});

console.log(parseResult);
