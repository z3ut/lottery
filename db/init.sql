CREATE SCHEMA IF NOT EXISTS lottery;

CREATE SEQUENCE IF NOT EXISTS lottery.lottery_id_seq;

ALTER SEQUENCE lottery.lottery_id_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS lottery.lottery
(
    id integer NOT NULL DEFAULT nextval('lottery.lottery_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    roll_from integer NOT NULL,
    roll_to integer NOT NULL,
    roll integer NOT NULL,
    date_created timestamp with time zone NOT NULL,
    date_roll timestamp with time zone NOT NULL,
    CONSTRAINT lottery_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE lottery.lottery
    OWNER to postgres;
