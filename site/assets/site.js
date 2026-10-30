// Posts lead forms to the GHL inbound webhook. Replace REPLACE_ME with the webhook URL from GHL.
const GHL_WEBHOOK = "REPLACE_ME";
document.querySelectorAll("form[data-lead]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = form.querySelector(".msg");
    const data = Object.fromEntries(new FormData(form));
    data.source = form.dataset.lead;
    data.page = location.pathname;
    if (!data.name || !data.phone) { msg.textContent = "Please add your name and phone."; return; }
    if (GHL_WEBHOOK === "REPLACE_ME") { msg.textContent = "Thanks! (Test mode: form not connected yet.)"; form.reset(); return; }
    try {
      const r = await fetch(GHL_WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      msg.textContent = r.ok ? "Thanks! We will call you shortly." : "Something went wrong. Please call us.";
      if (r.ok) form.reset();
    } catch { msg.textContent = "Something went wrong. Please call us."; }
  });
});
