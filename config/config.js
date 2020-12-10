let config = {};

if (Deno.env.get("TEST_ENVIRONMENT")) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "jrrzqpjh",
    user: "jrrzqpjh",
    password: "TzXTrBfp64sVGgvwqC7WT-LpnCr28XSa",
    port: 5432,
  };
}

export { config };
