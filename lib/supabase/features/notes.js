import { supabase } from "../client";

const CODE_LENGTH = 4;
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomCode() {
  let result = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    result += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return result;
}

async function generateUniqueCode() {
  while (true) {
    const code = randomCode();
    const { data } = await supabase
      .from("notes")
      .select("code")
      .eq("code", code)
      .maybeSingle();
    if (!data) return code;
  }
}

export async function createShortLink(hash, expiresAt) {
  const code = await generateUniqueCode();
  const { error } = await supabase
    .from("notes")
    .insert({
      code,
      hash,
      expire_at: expiresAt
    });
  if (error) throw error;
  return code;
}

export async function resolveCode(code) {
  const { data, error } = await supabase
    .from("notes")
    .select("hash")
    .eq("code", code)
    .gt("expire_at", new Date().toISOString())
    .maybeSingle();
  if (error) throw error;
  return data?.hash ?? null;
}

export async function deleteExpiredNotes() {
  return supabase
    .from("notes")
    .delete()
    .lt("expire_at", new Date().toISOString());
}
