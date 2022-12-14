import type { PersistenceFormat } from "../common/types";
import { Lyra, PropertiesSchema } from "@lyrasearch/lyra";
import { persist as persistDB, restore as restoreDB } from "../common/utils";

export function importInstance<T extends PropertiesSchema>(
  data: string | Buffer,
  format: PersistenceFormat
): Lyra<T> {
  return restoreDB(format, data);
}

export function exportInstance<T extends PropertiesSchema>(
  db: Lyra<T>,
  format: PersistenceFormat = "binary"
): string | Buffer {
  return persistDB(db, format);
}
