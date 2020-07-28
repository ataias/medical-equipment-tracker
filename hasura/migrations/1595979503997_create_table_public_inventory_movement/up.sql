CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."inventory_movement"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "movement_type" integer NOT NULL DEFAULT 1, "location_id" uuid NOT NULL, "inventory_id" uuid NOT NULL, "quantity" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "is_locked" boolean NOT NULL DEFAULT false, "moved_at" timestamptz NOT NULL, "moved_by" uuid NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("inventory_id") REFERENCES "public"."inventory"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("moved_by") REFERENCES "public"."personnel"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_inventory_movement_updated_at"
BEFORE UPDATE ON "public"."inventory_movement"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_inventory_movement_updated_at" ON "public"."inventory_movement" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
