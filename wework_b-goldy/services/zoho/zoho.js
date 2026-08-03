const ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com';
const API_DOMAIN = process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com';

let cachedToken = null;

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.accessToken;
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token?${params.toString()}`, {
    method: 'POST',
  });
  const body = await res.json();

  if (!res.ok || !body.access_token) {
    throw new Error(`Zoho token refresh failed: ${JSON.stringify(body)}`);
  }

  cachedToken = {
    accessToken: body.access_token,
    expiresAt: Date.now() + (body.expires_in - 60) * 1000,
  };
  return cachedToken.accessToken;
}

function pick(data, keys) {
  const lower = {};
  for (const [k, v] of Object.entries(data)) lower[k.toLowerCase()] = v;
  for (const key of keys) {
    const v = lower[key.toLowerCase()];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
}

function toLead(data) {
  const lead = {};

  const firstName = pick(data, ['first_name', 'firstname', 'fname']);
  const lastName = pick(data, ['last_name', 'lastname', 'lname', 'name', 'full_name']);
  const email = pick(data, ['email', 'email_address', 'mail']);
  const phone = pick(data, ['phone', 'mobile', 'phone_number', 'contact']);
  const company = pick(data, ['company', 'company_name', 'organization', 'org']);
  const source = pick(data, ['lead_source', 'source', 'utm_source']);
  const description = pick(data, ['message', 'description', 'notes', 'comments']);
  const city = pick(data, ['city', 'city_preferred']);

  if (firstName) lead.First_Name = firstName;
  lead.Last_Name = lastName || firstName || email || 'Website Lead';
  if (email) lead.Email = email;
  if (phone) {
    lead.Phone = phone;
    lead.Mobile = phone;
    lead.Contact_Number_1 = phone;
  }
  lead.Company = company || 'Unknown';
  lead.Lead_Source = source || 'Website';
  if (description) lead.Description = description;
  if (city) lead.City_Preferred = city;

  return lead;
}

async function createLead(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Payload must be a JSON object');
  }

  const token = await getAccessToken();
  const lead = toLead(data);
  const res = await fetch(`${API_DOMAIN}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [lead] }),
  });
  const body = await res.json();
  const record = body?.data?.[0];
  if (!res.ok || record?.status !== 'success') {
    throw new Error(`Zoho lead create failed: ${JSON.stringify(body)}`);
  }

  return { id: record.details?.id, lead };
}

module.exports = { createLead };
