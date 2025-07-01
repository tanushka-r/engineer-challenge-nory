CREATE TABLE "staff" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "staff_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"location_id" integer NOT NULL,
	"date_of_birth" date NOT NULL,
	"iban" varchar NOT NULL,
	"bic" varchar NOT NULL
);
