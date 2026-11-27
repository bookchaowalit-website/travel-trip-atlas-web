# 01 — Business process (As-Is / To-Be)

travel-trip-atlas-web (Trip Atlas) คือเว็บอ่านแผนเส้นทางท่องเที่ยวสำหรับผู้เยี่ยมชมหรือนักเดินทางที่อยากร่างทริปสั้นๆ แสดงเส้นทางสังเคราะห์ 3 เส้น (เหนือ ชายฝั่ง สิงคโปร์) พร้อมแผนรายวันและงบประมาณโดยประมาณ หน้าเว็บสร้างแบบ static จากข้อมูลในโค้ด ไม่มีการจอง แผนที่ ราคาสด หรือบัญชีผู้ใช้

Last reviewed: 2026-11-28 · commit `7f85e36`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart TD
  V["ผู้เยี่ยมชมเปิดเว็บ"] --> HOME["หน้า / (app/page.tsx): HomeView รายการเส้นทาง 3 เส้น พร้อมคืน งบ และสต็อป"]
  DATA["lib/trip-atlas.ts: routes พร้อม stops 3 จุดและ budget ที่เขียนมือ"] --> HOME
  HOME -->|เลือกเส้นทาง| ROUTE["/routes/id (generateStaticParams จาก routes)"]
  DATA --> ROUTE
  V --> BAD["/routes/id ที่ไม่มีในรายการ"]
  BAD --> NF["dynamicParams=false: ตอบ 404"]
  ROUTE --> DAYS["RouteView: ต้นทางถึงปลายทาง, คืน, งบ THB และแผนรายวัน อ่านอย่างเดียว"]
  DAYS --> PAGER["Pager: เส้นทางก่อนหน้า/ถัดไป"]
  PAGER --> ROUTE
  V --> OLD["/more-projects"]
  OLD --> RED["next.config redirects: 308 ไป bookchaowalit.com"]
  V --> SEO["/robots.txt: กฎคงที่ + SITE_URL (ไม่อ่าน routes); /sitemap.xml: SITE_URL + URL รายเส้นทางจาก routes"]
  HOME -.-> SENTRY["error เท่านั้นส่ง Sentry เมื่อมี NEXT_PUBLIC_SENTRY_DSN, scrubEvent ลบ request/user/breadcrumbs/extra, ตัด query/fragment ในข้อความ error และ URL (ข้อมูลอื่นในข้อความ error ยังส่งได้)"]
  CI["push/PR เข้า main: CI กลาง + security scan (ตรวจอย่างเดียว ไม่มี job deploy)"]
  DEPLOY["push เข้า main: Vercel Git integration deploy (ไม่ทราบว่ารอ CI หรือไม่) [ต้องยืนยัน]"] --> HOME
```

Sources: `app/page.tsx`, `app/routes/[id]/page.tsx`, `components/atlas-views.tsx`, `lib/trip-atlas.ts`, `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`, `next.config.ts`, `lib/sentry.ts`, `instrumentation.ts`, `.github/workflows/ci.yml`

## To-Be (ไม่มี To-Be ที่เขียนไว้)

ไม่มี To-Be ที่เขียนไว้

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | เดโมข้อมูลสังเคราะห์ที่ไม่มี roadmap → ต้องการเป้าหมายที่เขียนไว้ (คงเป็นเดโม หรือเพิ่มการจอง/ราคาจริง) | decide | owner | `PRODUCT.md` ระบุว่าไม่มีการจอง แผนที่ หรือข้อมูลสด และไม่มีเป้าหมายถัดไป |

## Open questions

- `README.md` และ `PRODUCT.md` ยังบรรยายหน้าเดียวแบบ client ที่กด "Mark next stop" และปุ่ม "Route complete" ได้ แต่โค้ดตอนนี้เป็นหน้า server render บน Reader shell: แผนรายวันเป็นรายการอ่านอย่างเดียว ไม่มีปุ่มก้าวไปสต็อปถัดไป: เอกสารล้าหลังโค้ด
- สถานะ deploy จริงของ Vercel ยืนยันจากโค้ดไม่ได้ [ต้องยืนยัน]
