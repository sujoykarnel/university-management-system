
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import httpStatus24 from "http-status";

// src/app/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bak_url: process.env.APP_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  tester_admin_name: process.env.TESTER_ADMIN_NAME,
  tester_admin_email: process.env.TESTER_ADMIN_EMAIL,
  tester_admin_password: process.env.TESTER_ADMIN_PASSWORD,
  tester_doctor_name: process.env.TESTER_DOCTER_NAME,
  tester_doctor_email: process.env.TESTER_DOCTER_EMAIL,
  tester_doctor_password: process.env.TESTER_DOCTER_PASSWORD,
  redis_user: process.env.REDIS_USER,
  redis_password: process.env.REDIS_PASSWORD,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_sender: process.env.SMTP_SENDER,
  smtp_password: process.env.SMTP_PASSWORD,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  bkash_base_url: process.env.BKASH_BASE_URL,
  bkash_username: process.env.BKASH_USERNAME,
  bkash_password: process.env.BKASH_PASSWORD,
  bkash_app_key: process.env.BKASH_APP_KEY,
  bkash_app_secret: process.env.BKASH_APP_SECRET,
  bkash_callback_url: process.env.BKASH_CALLBACK_URL
};

// src/app/middleware/globalErrorHandler.ts
import httpStatus from "http-status";

// src/generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.0",
  "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Attendance {\n  id String @id @default(uuid())\n\n  courseRegistrationId String\n  courseRegistration   CourseRegistration @relation(fields: [courseRegistrationId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  classDate DateTime\n  status    AttendanceStatus\n\n  remarks String?\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([courseRegistrationId, classDate])\n  @@index([courseRegistrationId])\n  @@index([classDate])\n  @@map("attendances")\n}\n\nmodel Course {\n  id         String @id @default(uuid())\n  title      String\n  code       String\n  credit     Float\n  semesterNo Int\n\n  programId String\n  program   Program @relation(fields: [programId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courseOfferings CourseOffering[]\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([code, programId], name: "unique_code_program")\n  @@index([title], name: "idx_course_title")\n  @@index([code], name: "idx_course_code")\n  @@map("courses")\n}\n\nmodel CourseOffering {\n  id String @id @default(ulid())\n\n  courseId String\n  course   Course @relation(fields: [courseId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  semesterId String\n  semester   Semester @relation(fields: [semesterId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  instructorId String\n  instructor   Instructor @relation(fields: [instructorId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courseFee     Int\n  totalSeat     Int\n  availableSeat Int\n\n  courseRegistration CourseRegistration[]\n  exam               Exam?\n\n  isDelete Boolean   @default(false)\n  deleteAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([courseId, semesterId], name: "unique_course_semester")\n  @@index([semesterId])\n  @@index([instructorId])\n  @@index([courseId])\n  @@map("couserOffierings")\n}\n\nmodel CourseRegistration {\n  id     String             @id @default(uuid())\n  status RegistrationStatus @default(PENDING)\n\n  studentId String\n  student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courseOfferingId String\n  courseOffering   CourseOffering @relation(fields: [courseOfferingId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  payment     Payment?\n  attendances Attendance[]\n  results     Result[]\n\n  @@unique([studentId, courseOfferingId], name: "unique_registration_studentId_course")\n  @@index([studentId, courseOfferingId], name: "idx_registration_studentId_course")\n  @@map("courseRegistration")\n}\n\nmodel Department {\n  id   String @id @default(uuid())\n  name String\n  code String\n\n  universityId String\n  university   University @relation(fields: [universityId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  instructors Instructor[]\n  programs    Program[]\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updateAt  DateTime @updatedAt\n\n  @@unique([code, universityId], name: "unique_code_university")\n  @@index([code], name: "idx_department_code")\n  @@map("departments")\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  INSTRUCTOR\n  STUDENT\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum Gender {\n  MALE\n  FEMALE\n  OTHER\n}\n\nenum AuthProvider {\n  GOOGLE\n  CREDENTIAL\n}\n\nenum RegistrationStatus {\n  PENDING\n  CONFIRMED\n  CANCELED\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  FAILED\n  CANCELED\n  REFUNDED\n}\n\nenum InstructorVerificationStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nenum SemesterStatus {\n  UPCOMING\n  ACTIVE\n  COMPLETED\n  CLOSED\n}\n\nenum AttendanceStatus {\n  PRESENT\n  ABSENT\n  LATE\n  EXCUSED\n}\n\nenum ExamType {\n  MIDTERM\n  FINAL\n  QUIZ\n  ASSIGNMENT\n  VIVA\n}\n\nenum resultStatus {\n  DRAFT\n  PUBLISHED\n}\n\nmodel Exam {\n  id        String   @id @default(uuid())\n  type      ExamType\n  toalMarks Float\n  examDate  DateTime\n\n  courseOfferingId String         @unique\n  courseOffering   CourseOffering @relation(fields: [courseOfferingId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  results Result[]\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([courseOfferingId], name: "idx_courseOfferingId")\n  @@index([examDate])\n  @@map("exams")\n}\n\nmodel Instructor {\n  id      String  @id @default(uuid())\n  name    String\n  email   String  @unique\n  address String?\n\n  resume          String?\n  resumePublicId  String?\n  additionalFiles Json? // stores: [{url:"...", publicId: "..."}]\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  departmentId String\n  department   Department @relation(fields: [departmentId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courseOfferings CourseOffering[]\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([email], name: "idx_instructor_email")\n  @@map("instructors")\n}\n\nmodel Payment {\n  id                    String        @id @default(uuid())\n  status                PaymentStatus @default(UNPAID)\n  amount                Decimal       @db.Decimal(10, 2)\n  currency              String        @default("BDT")\n  paymentGetway         String        @default("bkash")\n  merchantInvoiceNumber String        @unique // courseRegistration id\n  bkashPaymentId        String?       @unique\n  bkashTrxId            String?\n  payerReference        String?\n  paidAt                String?\n  gatewayResponse       Json?\n  refundTrxId           String?\n  refundAmount          Decimal?      @db.Decimal(10, 2)\n  refundReason          String?\n  refundedAt            String?\n\n  courseRegistationId String             @unique\n  courseRegistration  CourseRegistration @relation(fields: [courseRegistationId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("payments")\n}\n\nmodel Program {\n  id           String @id @default(uuid())\n  name         String\n  code         String @unique\n  duration     Int\n  totalCredits Float\n\n  departmentId String\n  department   Department @relation(fields: [departmentId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courses Course[]\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([name], name: "idx_program_name")\n  @@map("programs")\n}\n\nmodel Result {\n  id String @id @default(uuid())\n\n  examId String\n  exam   Exam   @relation(fields: [examId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courseRegistrationId String\n  courseRegistration   CourseRegistration @relation(fields: [courseRegistrationId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  marks      Float\n  grade      String\n  gradePoint Float\n\n  status resultStatus @default(DRAFT)\n\n  publishedAt DateTime?\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([examId, courseRegistrationId])\n  @@index([examId])\n  @@index([courseRegistrationId])\n  @@map("results")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Semester {\n  id        String         @id @default(uuid())\n  name      String\n  year      Int\n  startDate DateTime\n  endDate   DateTime\n  status    SemesterStatus @default(UPCOMING)\n\n  courseOfferings CourseOffering[]\n  transcript      Transcript[]\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("semesters")\n}\n\nmodel Student {\n  id      String  @id @default(uuid())\n  name    String\n  email   String  @unique\n  address String?\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  courseRegistration CourseRegistration[]\n  transcript         Transcript[]\n\n  admistionYear   Int?\n  currentSemester Int?\n  isActive        Boolean @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([email], name: "idx_student_email")\n  @@index([isActive], name: "idx_student_isActive")\n  @@index([isDeleted], name: "idx_student_isDeleted")\n  @@map("students")\n}\n\nmodel Transcript {\n  id String @id @default(uuid())\n\n  studentId String\n  student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  semesterId String\n  semester   Semester @relation(fields: [semesterId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  totalCredit  Float\n  earnedCredit Float\n\n  gpa  Float\n  cgpa Float\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([studentId, semesterId])\n  @@index([studentId])\n  @@index([semesterId])\n  @@map("transcripts")\n}\n\nmodel University {\n  id        String  @id @default(uuid())\n  name      String\n  shortName String  @unique\n  address   String?\n  email     String?\n  phone     String?\n\n  departments Department[]\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("universities")\n}\n\nmodel User {\n  id                 String       @id @default(uuid())\n  name               String\n  email              String\n  phone              String?\n  password           String?\n  googleId           String?      @unique\n  authProvider       AuthProvider @default(CREDENTIAL)\n  emailVerified      Boolean      @default(false)\n  role               Role         @default(STUDENT)\n  status             UserStatus   @default(ACTIVE)\n  needPasswordChange Boolean      @default(false)\n  imageUrl           String       @default("")\n  imagePublicId      String       @default("")\n\n  instuctor Instructor?\n  student   Student?\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([email])\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Attendance":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"courseRegistrationId","kind":"scalar","type":"String"},{"name":"courseRegistration","kind":"object","type":"CourseRegistration","relationName":"AttendanceToCourseRegistration"},{"name":"classDate","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"AttendanceStatus"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"attendances","schema":null},"Course":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"credit","kind":"scalar","type":"Float"},{"name":"semesterNo","kind":"scalar","type":"Int"},{"name":"programId","kind":"scalar","type":"String"},{"name":"program","kind":"object","type":"Program","relationName":"CourseToProgram"},{"name":"courseOfferings","kind":"object","type":"CourseOffering","relationName":"CourseToCourseOffering"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"courses","schema":null},"CourseOffering":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"courseId","kind":"scalar","type":"String"},{"name":"course","kind":"object","type":"Course","relationName":"CourseToCourseOffering"},{"name":"semesterId","kind":"scalar","type":"String"},{"name":"semester","kind":"object","type":"Semester","relationName":"CourseOfferingToSemester"},{"name":"instructorId","kind":"scalar","type":"String"},{"name":"instructor","kind":"object","type":"Instructor","relationName":"CourseOfferingToInstructor"},{"name":"courseFee","kind":"scalar","type":"Int"},{"name":"totalSeat","kind":"scalar","type":"Int"},{"name":"availableSeat","kind":"scalar","type":"Int"},{"name":"courseRegistration","kind":"object","type":"CourseRegistration","relationName":"CourseOfferingToCourseRegistration"},{"name":"exam","kind":"object","type":"Exam","relationName":"CourseOfferingToExam"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deleteAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"couserOffierings","schema":null},"CourseRegistration":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"RegistrationStatus"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"Student","relationName":"CourseRegistrationToStudent"},{"name":"courseOfferingId","kind":"scalar","type":"String"},{"name":"courseOffering","kind":"object","type":"CourseOffering","relationName":"CourseOfferingToCourseRegistration"},{"name":"payment","kind":"object","type":"Payment","relationName":"CourseRegistrationToPayment"},{"name":"attendances","kind":"object","type":"Attendance","relationName":"AttendanceToCourseRegistration"},{"name":"results","kind":"object","type":"Result","relationName":"CourseRegistrationToResult"}],"dbName":"courseRegistration","schema":null},"Department":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"universityId","kind":"scalar","type":"String"},{"name":"university","kind":"object","type":"University","relationName":"DepartmentToUniversity"},{"name":"instructors","kind":"object","type":"Instructor","relationName":"DepartmentToInstructor"},{"name":"programs","kind":"object","type":"Program","relationName":"DepartmentToProgram"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updateAt","kind":"scalar","type":"DateTime"}],"dbName":"departments","schema":null},"Exam":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"ExamType"},{"name":"toalMarks","kind":"scalar","type":"Float"},{"name":"examDate","kind":"scalar","type":"DateTime"},{"name":"courseOfferingId","kind":"scalar","type":"String"},{"name":"courseOffering","kind":"object","type":"CourseOffering","relationName":"CourseOfferingToExam"},{"name":"results","kind":"object","type":"Result","relationName":"ExamToResult"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"exams","schema":null},"Instructor":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"resume","kind":"scalar","type":"String"},{"name":"resumePublicId","kind":"scalar","type":"String"},{"name":"additionalFiles","kind":"scalar","type":"Json"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"InstructorToUser"},{"name":"departmentId","kind":"scalar","type":"String"},{"name":"department","kind":"object","type":"Department","relationName":"DepartmentToInstructor"},{"name":"courseOfferings","kind":"object","type":"CourseOffering","relationName":"CourseOfferingToInstructor"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"instructors","schema":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"paymentGetway","kind":"scalar","type":"String"},{"name":"merchantInvoiceNumber","kind":"scalar","type":"String"},{"name":"bkashPaymentId","kind":"scalar","type":"String"},{"name":"bkashTrxId","kind":"scalar","type":"String"},{"name":"payerReference","kind":"scalar","type":"String"},{"name":"paidAt","kind":"scalar","type":"String"},{"name":"gatewayResponse","kind":"scalar","type":"Json"},{"name":"refundTrxId","kind":"scalar","type":"String"},{"name":"refundAmount","kind":"scalar","type":"Decimal"},{"name":"refundReason","kind":"scalar","type":"String"},{"name":"refundedAt","kind":"scalar","type":"String"},{"name":"courseRegistationId","kind":"scalar","type":"String"},{"name":"courseRegistration","kind":"object","type":"CourseRegistration","relationName":"CourseRegistrationToPayment"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments","schema":null},"Program":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"totalCredits","kind":"scalar","type":"Float"},{"name":"departmentId","kind":"scalar","type":"String"},{"name":"department","kind":"object","type":"Department","relationName":"DepartmentToProgram"},{"name":"courses","kind":"object","type":"Course","relationName":"CourseToProgram"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"programs","schema":null},"Result":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"examId","kind":"scalar","type":"String"},{"name":"exam","kind":"object","type":"Exam","relationName":"ExamToResult"},{"name":"courseRegistrationId","kind":"scalar","type":"String"},{"name":"courseRegistration","kind":"object","type":"CourseRegistration","relationName":"CourseRegistrationToResult"},{"name":"marks","kind":"scalar","type":"Float"},{"name":"grade","kind":"scalar","type":"String"},{"name":"gradePoint","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"resultStatus"},{"name":"publishedAt","kind":"scalar","type":"DateTime"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"results","schema":null},"Semester":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"year","kind":"scalar","type":"Int"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"SemesterStatus"},{"name":"courseOfferings","kind":"object","type":"CourseOffering","relationName":"CourseOfferingToSemester"},{"name":"transcript","kind":"object","type":"Transcript","relationName":"SemesterToTranscript"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"semesters","schema":null},"Student":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"StudentToUser"},{"name":"courseRegistration","kind":"object","type":"CourseRegistration","relationName":"CourseRegistrationToStudent"},{"name":"transcript","kind":"object","type":"Transcript","relationName":"StudentToTranscript"},{"name":"admistionYear","kind":"scalar","type":"Int"},{"name":"currentSemester","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"students","schema":null},"Transcript":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"Student","relationName":"StudentToTranscript"},{"name":"semesterId","kind":"scalar","type":"String"},{"name":"semester","kind":"object","type":"Semester","relationName":"SemesterToTranscript"},{"name":"totalCredit","kind":"scalar","type":"Float"},{"name":"earnedCredit","kind":"scalar","type":"Float"},{"name":"gpa","kind":"scalar","type":"Float"},{"name":"cgpa","kind":"scalar","type":"Float"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"transcripts","schema":null},"University":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"shortName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"departments","kind":"object","type":"Department","relationName":"DepartmentToUniversity"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"universities","schema":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"instuctor","kind":"object","type":"Instructor","relationName":"InstructorToUser"},{"name":"student","kind":"object","type":"Student","relationName":"StudentToUser"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users","schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","orderBy","cursor","departments","_count","university","instructors","department","program","course","courseOfferings","student","semester","transcript","instructor","courseRegistration","courseOffering","exam","results","courses","programs","instuctor","payment","attendances","Attendance.findUnique","Attendance.findUniqueOrThrow","Attendance.findFirst","Attendance.findFirstOrThrow","Attendance.findMany","data","Attendance.createOne","Attendance.createMany","Attendance.createManyAndReturn","Attendance.updateOne","Attendance.updateMany","Attendance.updateManyAndReturn","create","update","Attendance.upsertOne","Attendance.deleteOne","Attendance.deleteMany","having","_min","_max","Attendance.groupBy","Attendance.aggregate","Course.findUnique","Course.findUniqueOrThrow","Course.findFirst","Course.findFirstOrThrow","Course.findMany","Course.createOne","Course.createMany","Course.createManyAndReturn","Course.updateOne","Course.updateMany","Course.updateManyAndReturn","Course.upsertOne","Course.deleteOne","Course.deleteMany","_avg","_sum","Course.groupBy","Course.aggregate","CourseOffering.findUnique","CourseOffering.findUniqueOrThrow","CourseOffering.findFirst","CourseOffering.findFirstOrThrow","CourseOffering.findMany","CourseOffering.createOne","CourseOffering.createMany","CourseOffering.createManyAndReturn","CourseOffering.updateOne","CourseOffering.updateMany","CourseOffering.updateManyAndReturn","CourseOffering.upsertOne","CourseOffering.deleteOne","CourseOffering.deleteMany","CourseOffering.groupBy","CourseOffering.aggregate","CourseRegistration.findUnique","CourseRegistration.findUniqueOrThrow","CourseRegistration.findFirst","CourseRegistration.findFirstOrThrow","CourseRegistration.findMany","CourseRegistration.createOne","CourseRegistration.createMany","CourseRegistration.createManyAndReturn","CourseRegistration.updateOne","CourseRegistration.updateMany","CourseRegistration.updateManyAndReturn","CourseRegistration.upsertOne","CourseRegistration.deleteOne","CourseRegistration.deleteMany","CourseRegistration.groupBy","CourseRegistration.aggregate","Department.findUnique","Department.findUniqueOrThrow","Department.findFirst","Department.findFirstOrThrow","Department.findMany","Department.createOne","Department.createMany","Department.createManyAndReturn","Department.updateOne","Department.updateMany","Department.updateManyAndReturn","Department.upsertOne","Department.deleteOne","Department.deleteMany","Department.groupBy","Department.aggregate","Exam.findUnique","Exam.findUniqueOrThrow","Exam.findFirst","Exam.findFirstOrThrow","Exam.findMany","Exam.createOne","Exam.createMany","Exam.createManyAndReturn","Exam.updateOne","Exam.updateMany","Exam.updateManyAndReturn","Exam.upsertOne","Exam.deleteOne","Exam.deleteMany","Exam.groupBy","Exam.aggregate","Instructor.findUnique","Instructor.findUniqueOrThrow","Instructor.findFirst","Instructor.findFirstOrThrow","Instructor.findMany","Instructor.createOne","Instructor.createMany","Instructor.createManyAndReturn","Instructor.updateOne","Instructor.updateMany","Instructor.updateManyAndReturn","Instructor.upsertOne","Instructor.deleteOne","Instructor.deleteMany","Instructor.groupBy","Instructor.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Program.findUnique","Program.findUniqueOrThrow","Program.findFirst","Program.findFirstOrThrow","Program.findMany","Program.createOne","Program.createMany","Program.createManyAndReturn","Program.updateOne","Program.updateMany","Program.updateManyAndReturn","Program.upsertOne","Program.deleteOne","Program.deleteMany","Program.groupBy","Program.aggregate","Result.findUnique","Result.findUniqueOrThrow","Result.findFirst","Result.findFirstOrThrow","Result.findMany","Result.createOne","Result.createMany","Result.createManyAndReturn","Result.updateOne","Result.updateMany","Result.updateManyAndReturn","Result.upsertOne","Result.deleteOne","Result.deleteMany","Result.groupBy","Result.aggregate","Semester.findUnique","Semester.findUniqueOrThrow","Semester.findFirst","Semester.findFirstOrThrow","Semester.findMany","Semester.createOne","Semester.createMany","Semester.createManyAndReturn","Semester.updateOne","Semester.updateMany","Semester.updateManyAndReturn","Semester.upsertOne","Semester.deleteOne","Semester.deleteMany","Semester.groupBy","Semester.aggregate","Student.findUnique","Student.findUniqueOrThrow","Student.findFirst","Student.findFirstOrThrow","Student.findMany","Student.createOne","Student.createMany","Student.createManyAndReturn","Student.updateOne","Student.updateMany","Student.updateManyAndReturn","Student.upsertOne","Student.deleteOne","Student.deleteMany","Student.groupBy","Student.aggregate","Transcript.findUnique","Transcript.findUniqueOrThrow","Transcript.findFirst","Transcript.findFirstOrThrow","Transcript.findMany","Transcript.createOne","Transcript.createMany","Transcript.createManyAndReturn","Transcript.updateOne","Transcript.updateMany","Transcript.updateManyAndReturn","Transcript.upsertOne","Transcript.deleteOne","Transcript.deleteMany","Transcript.groupBy","Transcript.aggregate","University.findUnique","University.findUniqueOrThrow","University.findFirst","University.findFirstOrThrow","University.findMany","University.createOne","University.createMany","University.createManyAndReturn","University.updateOne","University.updateMany","University.updateManyAndReturn","University.upsertOne","University.deleteOne","University.deleteMany","University.groupBy","University.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","phone","password","googleId","AuthProvider","authProvider","emailVerified","Role","role","UserStatus","status","needPasswordChange","imageUrl","imagePublicId","isDeleted","deletedAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","shortName","address","isDelete","every","some","none","studentId","semesterId","totalCredit","earnedCredit","gpa","cgpa","userId","admistionYear","currentSemester","isActive","year","startDate","endDate","SemesterStatus","examId","courseRegistrationId","marks","grade","gradePoint","resultStatus","publishedAt","code","duration","totalCredits","departmentId","PaymentStatus","amount","currency","paymentGetway","merchantInvoiceNumber","bkashPaymentId","bkashTrxId","payerReference","paidAt","gatewayResponse","refundTrxId","refundAmount","refundReason","refundedAt","courseRegistationId","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","resume","resumePublicId","additionalFiles","ExamType","type","toalMarks","examDate","courseOfferingId","universityId","updateAt","RegistrationStatus","courseId","instructorId","courseFee","totalSeat","availableSeat","deleteAt","title","credit","semesterNo","programId","classDate","AttendanceStatus","remarks","examId_courseRegistrationId","unique_registration_studentId_course","studentId_semesterId","unique_course_semester","unique_code_program","unique_code_university","courseRegistrationId_classDate","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "6QeVAfABDhAAAO4DACCRAgAAhAQAMJICAAA6ABCTAgAAhAQAMJQCAQAAAAGgAgAAhQT-AiKlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIcgCAQC0AwAh_AJAALsDACH-AgEAtQMAIYUDAACkBAAgAQAAAAEAIBMBAADLAwAgCAAAnAQAIAsAANcDACCRAgAAngQAMJICAAADABCTAgAAngQAMJQCAQC0AwAhlQIBALQDACGWAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtAIBALUDACG_AgEAtAMAIdECAQC0AwAh5wIBALUDACHoAgEAtQMAIekCAADsAwAgAQAAAAMAIA4GAAChBAAgBwAAogQAIBUAAKMEACCRAgAAoAQAMJICAAAFABCTAgAAoAQAMJQCAQC0AwAhlQIBALQDACGlAkAAugMAIaYCQAC7AwAhtQIgALcDACHOAgEAtAMAIe8CAQC0AwAh8AJAALsDACEEBgAA_wYAIAcAAIAHACAVAACBBwAgpQIAAKUEACAPBgAAoQQAIAcAAKIEACAVAACjBAAgkQIAAKAEADCSAgAABQAQkwIAAKAEADCUAgEAAAABlQIBALQDACGlAkAAugMAIaYCQAC7AwAhtQIgALcDACHOAgEAtAMAIe8CAQC0AwAh8AJAALsDACGEAwAAnwQAIAMAAAAFACACAAAGADADAAAHACABAAAABQAgCAEAAJ4GACAIAAD9BgAgCwAAvQYAIKUCAAClBAAgtAIAAKUEACDnAgAApQQAIOgCAAClBAAg6QIAAKUEACATAQAAywMAIAgAAJwEACALAADXAwAgkQIAAJ4EADCSAgAAAwAQkwIAAJ4EADCUAgEAAAABlQIBALQDACGWAgEAAAABpAIgALcDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG0AgEAtQMAIb8CAQAAAAHRAgEAtAMAIecCAQC1AwAh6AIBALUDACHpAgAA7AMAIAMAAAADACACAAAKADADAAALACAPCAAAnAQAIBQAAJ0EACCRAgAAmwQAMJICAAANABCTAgAAmwQAMJQCAQC0AwAhlQIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAhzwICANUDACHQAggA9gMAIdECAQC0AwAhAwgAAP0GACAUAAD-BgAgpQIAAKUEACAPCAAAnAQAIBQAAJ0EACCRAgAAmwQAMJICAAANABCTAgAAmwQAMJQCAQAAAAGVAgEAtAMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhzgIBAAAAAc8CAgDVAwAh0AIIAPYDACHRAgEAtAMAIQMAAAANACACAAAOADADAAAPACAPCQAAmgQAIAsAANcDACCRAgAAmQQAMJICAAARABCTAgAAmQQAMJQCAQC0AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHOAgEAtAMAIfgCAQC0AwAh-QIIAPYDACH6AgIA1QMAIfsCAQC0AwAhAwkAAPwGACALAAC9BgAgpQIAAKUEACAQCQAAmgQAIAsAANcDACCRAgAAmQQAMJICAAARABCTAgAAmQQAMJQCAQAAAAGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAh-AIBALQDACH5AggA9gMAIfoCAgDVAwAh-wIBALQDACGDAwAAmAQAIAMAAAARACACAAASADADAAATACATCgAAlQQAIA0AAJIEACAPAACWBAAgEAAAzAMAIBIAAJcEACCRAgAAlAQAMJICAAAVABCTAgAAlAQAMJQCAQC0AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhugIBALQDACHyAgEAtAMAIfMCAQC0AwAh9AICANUDACH1AgIA1QMAIfYCAgDVAwAh9wJAALoDACEGCgAA-wYAIA0AAPoGACAPAADDBQAgEAAAnwYAIBIAAPcGACD3AgAApQQAIBQKAACVBAAgDQAAkgQAIA8AAJYEACAQAADMAwAgEgAAlwQAIJECAACUBAAwkgIAABUAEJMCAACUBAAwlAIBAAAAAaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIboCAQC0AwAh8gIBALQDACHzAgEAtAMAIfQCAgDVAwAh9QICANUDACH2AgIA1QMAIfcCQAC6AwAhggMAAJMEACADAAAAFQAgAgAAFgAwAwAAFwAgAwAAABUAIAIAABYAMAMAABcAIBAMAACNBAAgDQAAkgQAIJECAACRBAAwkgIAABoAEJMCAACRBAAwlAIBALQDACGkAiAAtwMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbkCAQC0AwAhugIBALQDACG7AggA9gMAIbwCCAD2AwAhvQIIAPYDACG-AggA9gMAIQMMAADEBQAgDQAA-gYAIKUCAAClBAAgEQwAAI0EACANAACSBAAgkQIAAJEEADCSAgAAGgAQkwIAAJEEADCUAgEAAAABpAIgALcDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG5AgEAtAMAIboCAQC0AwAhuwIIAPYDACG8AggA9gMAIb0CCAD2AwAhvgIIAPYDACGBAwAAkAQAIAMAAAAaACACAAAbADADAAAcACABAAAAFQAgAQAAABoAIAwMAACNBAAgEQAA9wMAIBMAAPgDACAXAACOBAAgGAAAjwQAIJECAACLBAAwkgIAACAAEJMCAACLBAAwlAIBALQDACGgAgAAjATyAiK5AgEAtAMAIe4CAQC0AwAhBQwAAMQFACARAADcBgAgEwAA3QYAIBcAAPgGACAYAAD5BgAgDQwAAI0EACARAAD3AwAgEwAA-AMAIBcAAI4EACAYAACPBAAgkQIAAIsEADCSAgAAIAAQkwIAAIsEADCUAgEAAAABoAIAAIwE8gIiuQIBALQDACHuAgEAtAMAIYADAACKBAAgAwAAACAAIAIAACEAMAMAACIAIA4RAAD3AwAgEwAA-AMAIJECAAD0AwAwkgIAACQAEJMCAAD0AwAwlAIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIesCAAD1A-sCIuwCCAD2AwAh7QJAALsDACHuAgEAtAMAIQEAAAAkACAREAAA7gMAIBIAAIkEACCRAgAAhwQAMJICAAAmABCTAgAAhwQAMJQCAQC0AwAhoAIAAIgEzQIipQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHHAgEAtAMAIcgCAQC0AwAhyQIIAPYDACHKAgEAtAMAIcsCCAD2AwAhzQJAALoDACEEEAAA0QYAIBIAAPcGACClAgAApQQAIM0CAAClBAAgEhAAAO4DACASAACJBAAgkQIAAIcEADCSAgAAJgAQkwIAAIcEADCUAgEAAAABoAIAAIgEzQIipQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHHAgEAtAMAIcgCAQC0AwAhyQIIAPYDACHKAgEAtAMAIcsCCAD2AwAhzQJAALoDACH_AgAAhgQAIAMAAAAmACACAAAnADADAAAoACABAAAAJgAgAQAAACAAIAEAAAAVACABAAAAEQAgAQAAAAMAIAEAAAANACADAAAAFQAgAgAAFgAwAwAAFwAgAQAAABUAIBIBAADLAwAgDgAAzQMAIBAAAMwDACCRAgAAyQMAMJICAAAyABCTAgAAyQMAMJQCAQC0AwAhlQIBALQDACGWAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtAIBALUDACG_AgEAtAMAIcACAgDKAwAhwQICAMoDACHCAiAAtwMAIQEAAAAyACADAAAAIAAgAgAAIQAwAwAAIgAgAwAAABoAIAIAABsAMAMAABwAIAEAAAAgACABAAAAGgAgFhAAAO4DACCRAgAA6QMAMJICAAA4ABCTAgAA6QMAMJQCAQC0AwAhoAIAAOoD0wIipgJAALsDACGnAkAAuwMAIdMCEADrAwAh1AIBALQDACHVAgEAtAMAIdYCAQC0AwAh1wIBALUDACHYAgEAtQMAIdkCAQC1AwAh2gIBALUDACHbAgAA7AMAINwCAQC1AwAh3QIQAO0DACHeAgEAtQMAId8CAQC1AwAh4AIBALQDACEBAAAAOAAgDRAAAO4DACCRAgAAhAQAMJICAAA6ABCTAgAAhAQAMJQCAQC0AwAhoAIAAIUE_gIipQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHIAgEAtAMAIfwCQAC7AwAh_gIBALUDACEDEAAA0QYAIKUCAAClBAAg_gIAAKUEACADAAAAOgAgAgAAOwAwAwAAAQAgAwAAACYAIAIAACcAMAMAACgAIAEAAAA6ACABAAAAJgAgAQAAAAEAIAMAAAA6ACACAAA7ADADAAABACADAAAAOgAgAgAAOwAwAwAAAQAgAwAAADoAIAIAADsAMAMAAAEAIAoQAAD2BgAglAIBAAAAAaACAAAA_gICpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAcgCAQAAAAH8AkAAAAAB_gIBAAAAAQEeAABEACAJlAIBAAAAAaACAAAA_gICpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAcgCAQAAAAH8AkAAAAAB_gIBAAAAAQEeAABGADABHgAARgAwChAAAPUGACCUAgEAqQQAIaACAADzBP4CIqUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhyAIBAKkEACH8AkAAsAQAIf4CAQCqBAAhAgAAAAEAIB4AAEkAIAmUAgEAqQQAIaACAADzBP4CIqUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhyAIBAKkEACH8AkAAsAQAIf4CAQCqBAAhAgAAADoAIB4AAEsAIAIAAAA6ACAeAABLACADAAAAAQAgJQAARAAgJgAASQAgAQAAAAEAIAEAAAA6ACAFBQAA8gYAICsAAPQGACAsAADzBgAgpQIAAKUEACD-AgAApQQAIAyRAgAAgAQAMJICAABSABCTAgAAgAQAMJQCAQCZAwAhoAIAAIEE_gIipQJAAJ8DACGmAkAAoAMAIacCQACgAwAhtQIgAJwDACHIAgEAmQMAIfwCQACgAwAh_gIBAJoDACEDAAAAOgAgAgAAUQAwKgAAUgAgAwAAADoAIAIAADsAMAMAAAEAIAEAAAATACABAAAAEwAgAwAAABEAIAIAABIAMAMAABMAIAMAAAARACACAAASADADAAATACADAAAAEQAgAgAAEgAwAwAAEwAgDAkAAPEGACALAAD6BQAglAIBAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHOAgEAAAAB-AIBAAAAAfkCCAAAAAH6AgIAAAAB-wIBAAAAAQEeAABaACAKlAIBAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHOAgEAAAAB-AIBAAAAAfkCCAAAAAH6AgIAAAAB-wIBAAAAAQEeAABcADABHgAAXAAwDAkAAPAGACALAADtBQAglAIBAKkEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIc4CAQCpBAAh-AIBAKkEACH5AggAxQQAIfoCAgCWBQAh-wIBAKkEACECAAAAEwAgHgAAXwAgCpQCAQCpBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACHOAgEAqQQAIfgCAQCpBAAh-QIIAMUEACH6AgIAlgUAIfsCAQCpBAAhAgAAABEAIB4AAGEAIAIAAAARACAeAABhACADAAAAEwAgJQAAWgAgJgAAXwAgAQAAABMAIAEAAAARACAGBQAA6wYAICsAAO4GACAsAADtBgAgPQAA7AYAID4AAO8GACClAgAApQQAIA2RAgAA_wMAMJICAABoABCTAgAA_wMAMJQCAQCZAwAhpQJAAJ8DACGmAkAAoAMAIacCQACgAwAhtQIgAJwDACHOAgEAmQMAIfgCAQCZAwAh-QIIAMIDACH6AgIAzwMAIfsCAQCZAwAhAwAAABEAIAIAAGcAMCoAAGgAIAMAAAARACACAAASADADAAATACABAAAAFwAgAQAAABcAIAMAAAAVACACAAAWADADAAAXACADAAAAFQAgAgAAFgAwAwAAFwAgAwAAABUAIAIAABYAMAMAABcAIBAKAAC7BQAgDQAAvAUAIA8AAPgFACAQAAC9BQAgEgAAvgUAIJQCAQAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAG6AgEAAAAB8gIBAAAAAfMCAQAAAAH0AgIAAAAB9QICAAAAAfYCAgAAAAH3AkAAAAABAR4AAHAAIAuUAgEAAAABpgJAAAAAAacCQAAAAAG1AiAAAAABugIBAAAAAfICAQAAAAHzAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQEeAAByADABHgAAcgAwEAoAAJgFACANAACZBQAgDwAA9gUAIBAAAJoFACASAACbBQAglAIBAKkEACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACG6AgEAqQQAIfICAQCpBAAh8wIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQIAAAAXACAeAAB1ACALlAIBAKkEACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACG6AgEAqQQAIfICAQCpBAAh8wIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQIAAAAVACAeAAB3ACACAAAAFQAgHgAAdwAgAwAAABcAICUAAHAAICYAAHUAIAEAAAAXACABAAAAFQAgBgUAAOYGACArAADpBgAgLAAA6AYAID0AAOcGACA-AADqBgAg9wIAAKUEACAOkQIAAP4DADCSAgAAfgAQkwIAAP4DADCUAgEAmQMAIaYCQACgAwAhpwJAAKADACG1AiAAnAMAIboCAQCZAwAh8gIBAJkDACHzAgEAmQMAIfQCAgDPAwAh9QICAM8DACH2AgIAzwMAIfcCQACfAwAhAwAAABUAIAIAAH0AMCoAAH4AIAMAAAAVACACAAAWADADAAAXACABAAAAIgAgAQAAACIAIAMAAAAgACACAAAhADADAAAiACADAAAAIAAgAgAAIQAwAwAAIgAgAwAAACAAIAIAACEAMAMAACIAIAkMAAC5BQAgEQAA_wQAIBMAAIIFACAXAACABQAgGAAAgQUAIJQCAQAAAAGgAgAAAPICArkCAQAAAAHuAgEAAAABAR4AAIYBACAElAIBAAAAAaACAAAA8gICuQIBAAAAAe4CAQAAAAEBHgAAiAEAMAEeAACIAQAwCQwAALcFACARAADWBAAgEwAA2QQAIBcAANcEACAYAADYBAAglAIBAKkEACGgAgAA1ATyAiK5AgEAqQQAIe4CAQCpBAAhAgAAACIAIB4AAIsBACAElAIBAKkEACGgAgAA1ATyAiK5AgEAqQQAIe4CAQCpBAAhAgAAACAAIB4AAI0BACACAAAAIAAgHgAAjQEAIAMAAAAiACAlAACGAQAgJgAAiwEAIAEAAAAiACABAAAAIAAgAwUAAOMGACArAADlBgAgLAAA5AYAIAeRAgAA-gMAMJICAACUAQAQkwIAAPoDADCUAgEAmQMAIaACAAD7A_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_AgEAAAAB0QIBAAAAAecCAQAAAAHoAgEAAAAB6QKAAAAAAQEeAADKAQAgDZQCAQAAAAGVAgEAAAABlgIBAAAAAaQCIAAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG0AgEAAAABvwIBAAAAAdECAQAAAAHnAgEAAAAB6AIBAAAAAekCgAAAAAEBHgAAzAEAMAEeAADMAQAwEAEAAIgGACAIAACKBQAgCwAAiwUAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACG_AgEAqQQAIdECAQCpBAAh5wIBAKoEACHoAgEAqgQAIekCgAAAAAECAAAACwAgHgAAzwEAIA2UAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhvwIBAKkEACHRAgEAqQQAIecCAQCqBAAh6AIBAKoEACHpAoAAAAABAgAAAAMAIB4AANEBACACAAAAAwAgHgAA0QEAIAMAAAALACAlAADKAQAgJgAAzwEAIAEAAAALACABAAAAAwAgCAUAANIGACArAADUBgAgLAAA0wYAIKUCAAClBAAgtAIAAKUEACDnAgAApQQAIOgCAAClBAAg6QIAAKUEACAQkQIAAO8DADCSAgAA2AEAEJMCAADvAwAwlAIBAJkDACGVAgEAmQMAIZYCAQCZAwAhpAIgAJwDACGlAkAAnwMAIaYCQACgAwAhpwJAAKADACG0AgEAmgMAIb8CAQCZAwAh0QIBAJkDACHnAgEAmgMAIegCAQCaAwAh6QIAAOADACADAAAAAwAgAgAA1wEAMCoAANgBACADAAAAAwAgAgAACgAwAwAACwAgFhAAAO4DACCRAgAA6QMAMJICAAA4ABCTAgAA6QMAMJQCAQAAAAGgAgAA6gPTAiKmAkAAuwMAIacCQAC7AwAh0wIQAOsDACHUAgEAtAMAIdUCAQC0AwAh1gIBAAAAAdcCAQAAAAHYAgEAtQMAIdkCAQC1AwAh2gIBALUDACHbAgAA7AMAINwCAQC1AwAh3QIQAO0DACHeAgEAtQMAId8CAQC1AwAh4AIBAAAAAQEAAADbAQAgAQAAANsBACAKEAAA0QYAINcCAAClBAAg2AIAAKUEACDZAgAApQQAINoCAAClBAAg2wIAAKUEACDcAgAApQQAIN0CAAClBAAg3gIAAKUEACDfAgAApQQAIAMAAAA4ACACAADeAQAwAwAA2wEAIAMAAAA4ACACAADeAQAwAwAA2wEAIAMAAAA4ACACAADeAQAwAwAA2wEAIBMQAADQBgAglAIBAAAAAaACAAAA0wICpgJAAAAAAacCQAAAAAHTAhAAAAAB1AIBAAAAAdUCAQAAAAHWAgEAAAAB1wIBAAAAAdgCAQAAAAHZAgEAAAAB2gIBAAAAAdsCgAAAAAHcAgEAAAAB3QIQAAAAAd4CAQAAAAHfAgEAAAAB4AIBAAAAAQEeAADiAQAgEpQCAQAAAAGgAgAAANMCAqYCQAAAAAGnAkAAAAAB0wIQAAAAAdQCAQAAAAHVAgEAAAAB1gIBAAAAAdcCAQAAAAHYAgEAAAAB2QIBAAAAAdoCAQAAAAHbAoAAAAAB3AIBAAAAAd0CEAAAAAHeAgEAAAAB3wIBAAAAAeACAQAAAAEBHgAA5AEAMAEeAADkAQAwExAAAM8GACCUAgEAqQQAIaACAAD7BNMCIqYCQACwBAAhpwJAALAEACHTAhAA_AQAIdQCAQCpBAAh1QIBAKkEACHWAgEAqQQAIdcCAQCqBAAh2AIBAKoEACHZAgEAqgQAIdoCAQCqBAAh2wKAAAAAAdwCAQCqBAAh3QIQAP0EACHeAgEAqgQAId8CAQCqBAAh4AIBAKkEACECAAAA2wEAIB4AAOcBACASlAIBAKkEACGgAgAA-wTTAiKmAkAAsAQAIacCQACwBAAh0wIQAPwEACHUAgEAqQQAIdUCAQCpBAAh1gIBAKkEACHXAgEAqgQAIdgCAQCqBAAh2QIBAKoEACHaAgEAqgQAIdsCgAAAAAHcAgEAqgQAId0CEAD9BAAh3gIBAKoEACHfAgEAqgQAIeACAQCpBAAhAgAAADgAIB4AAOkBACACAAAAOAAgHgAA6QEAIAMAAADbAQAgJQAA4gEAICYAAOcBACABAAAA2wEAIAEAAAA4ACAOBQAAygYAICsAAM0GACAsAADMBgAgPQAAywYAID4AAM4GACDXAgAApQQAINgCAAClBAAg2QIAAKUEACDaAgAApQQAINsCAAClBAAg3AIAAKUEACDdAgAApQQAIN4CAAClBAAg3wIAAKUEACAVkQIAAN0DADCSAgAA8AEAEJMCAADdAwAwlAIBAJkDACGgAgAA3gPTAiKmAkAAoAMAIacCQACgAwAh0wIQAN8DACHUAgEAmQMAIdUCAQCZAwAh1gIBAJkDACHXAgEAmgMAIdgCAQCaAwAh2QIBAJoDACHaAgEAmgMAIdsCAADgAwAg3AIBAJoDACHdAhAA4QMAId4CAQCaAwAh3wIBAJoDACHgAgEAmQMAIQMAAAA4ACACAADvAQAwKgAA8AEAIAMAAAA4ACACAADeAQAwAwAA2wEAIAEAAAAPACABAAAADwAgAwAAAA0AIAIAAA4AMAMAAA8AIAMAAAANACACAAAOADADAAAPACADAAAADQAgAgAADgAwAwAADwAgDAgAAMkGACAUAAD8BQAglAIBAAAAAZUCAQAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG1AiAAAAABzgIBAAAAAc8CAgAAAAHQAggAAAAB0QIBAAAAAQEeAAD4AQAgCpQCAQAAAAGVAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAc4CAQAAAAHPAgIAAAAB0AIIAAAAAdECAQAAAAEBHgAA-gEAMAEeAAD6AQAwDAgAAMgGACAUAADhBQAglAIBAKkEACGVAgEAqQQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhzgIBAKkEACHPAgIAlgUAIdACCADFBAAh0QIBAKkEACECAAAADwAgHgAA_QEAIAqUAgEAqQQAIZUCAQCpBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACHOAgEAqQQAIc8CAgCWBQAh0AIIAMUEACHRAgEAqQQAIQIAAAANACAeAAD_AQAgAgAAAA0AIB4AAP8BACADAAAADwAgJQAA-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_AgEAAAABwAICAMoDACHBAgIAygMAIcICIAC3AwAhAQAAALgCACABAAAAuAIAIAcBAACeBgAgDgAAoAYAIBAAAJ8GACClAgAApQQAILQCAAClBAAgwAIAAKUEACDBAgAApQQAIAMAAAAyACACAAC7AgAwAwAAuAIAIAMAAAAyACACAAC7AgAwAwAAuAIAIAMAAAAyACACAAC7AgAwAwAAuAIAIA8BAACdBgAgDgAAhAUAIBAAAIMFACCUAgEAAAABlQIBAAAAAZYCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtAIBAAAAAb8CAQAAAAHAAgIAAAABwQICAAAAAcICIAAAAAEBHgAAvwIAIAyUAgEAAAABlQIBAAAAAZYCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtAIBAAAAAb8CAQAAAAHAAgIAAAABwQICAAAAAcICIAAAAAEBHgAAwQIAMAEeAADBAgAwDwEAAJwGACAOAAC6BAAgEAAAuQQAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACG_AgEAqQQAIcACAgC4BAAhwQICALgEACHCAiAArAQAIQIAAAC4AgAgHgAAxAIAIAyUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhvwIBAKkEACHAAgIAuAQAIcECAgC4BAAhwgIgAKwEACECAAAAMgAgHgAAxgIAIAIAAAAyACAeAADGAgAgAwAAALgCACAlAAC_AgAgJgAAxAIAIAEAAAC4AgAgAQAAADIAIAkFAACXBgAgKwAAmgYAICwAAJkGACA9AACYBgAgPgAAmwYAIKUCAAClBAAgtAIAAKUEACDAAgAApQQAIMECAAClBAAgD5ECAADFAwAwkgIAAM0CABCTAgAAxQMAMJQCAQCZAwAhlQIBAJkDACGWAgEAmQMAIaQCIACcAwAhpQJAAJ8DACGmAkAAoAMAIacCQACgAwAhtAIBAJoDACG_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_AgAgAQAAAP8CACAWDAAAvQMAIBYAALwDACCRAgAAswMAMJICAACCAwAQkwIAALMDADCUAgEAtAMAIZUCAQC0AwAhlgIBALQDACGXAgEAtQMAIZgCAQC1AwAhmQIBALUDACGbAgAAtgObAiKcAiAAtwMAIZ4CAAC4A54CIqACAAC5A6ACIqECIAC3AwAhogIBALQDACGjAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhBgwAAMQFACAWAADDBQAglwIAAKUEACCYAgAApQQAIJkCAAClBAAgpQIAAKUEACADAAAAggMAIAIAAIMDADADAAD_AgAgAwAAAIIDACACAACDAwAwAwAA_wIAIAMAAACCAwAgAgAAgwMAMAMAAP8CACATDAAAwgUAIBYAAMEFACCUAgEAAAABlQIBAAAAAZYCAQAAAAGXAgEAAAABmAIBAAAAAZkCAQAAAAGbAgAAAJsCApwCIAAAAAGeAgAAAJ4CAqACAAAAoAICoQIgAAAAAaICAQAAAAGjAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAQEeAACHAwAgEZQCAQAAAAGVAgEAAAABlgIBAAAAAZcCAQAAAAGYAgEAAAABmQIBAAAAAZsCAAAAmwICnAIgAAAAAZ4CAAAAngICoAIAAACgAgKhAiAAAAABogIBAAAAAaMCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABAR4AAIkDADABHgAAiQMAMBMMAACyBAAgFgAAsQQAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIZcCAQCqBAAhmAIBAKoEACGZAgEAqgQAIZsCAACrBJsCIpwCIACsBAAhngIAAK0EngIioAIAAK4EoAIioQIgAKwEACGiAgEAqQQAIaMCAQCpBAAhpAIgAKwEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACECAAAA_wIAIB4AAIwDACARlAIBAKkEACGVAgEAqQQAIZYCAQCpBAAhlwIBAKoEACGYAgEAqgQAIZkCAQCqBAAhmwIAAKsEmwIinAIgAKwEACGeAgAArQSeAiKgAgAArgSgAiKhAiAArAQAIaICAQCpBAAhowIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIQIAAACCAwAgHgAAjgMAIAIAAACCAwAgHgAAjgMAIAMAAAD_AgAgJQAAhwMAICYAAIwDACABAAAA_wIAIAEAAACCAwAgBwUAAKYEACArAACoBAAgLAAApwQAIJcCAAClBAAgmAIAAKUEACCZAgAApQQAIKUCAAClBAAgFJECAACYAwAwkgIAAJUDABCTAgAAmAMAMJQCAQCZAwAhlQIBAJkDACGWAgEAmQMAIZcCAQCaAwAhmAIBAJoDACGZAgEAmgMAIZsCAACbA5sCIpwCIACcAwAhngIAAJ0DngIioAIAAJ4DoAIioQIgAJwDACGiAgEAmQMAIaMCAQCZAwAhpAIgAJwDACGlAkAAnwMAIaYCQACgAwAhpwJAAKADACEDAAAAggMAIAIAAJQDADAqAACVAwAgAwAAAIIDACACAACDAwAwAwAA_wIAIBSRAgAAmAMAMJICAACVAwAQkwIAAJgDADCUAgEAmQMAIZUCAQCZAwAhlgIBAJkDACGXAgEAmgMAIZgCAQCaAwAhmQIBAJoDACGbAgAAmwObAiKcAiAAnAMAIZ4CAACdA54CIqACAACeA6ACIqECIACcAwAhogIBAJkDACGjAgEAmQMAIaQCIACcAwAhpQJAAJ8DACGmAkAAoAMAIacCQACgAwAhDgUAAKIDACArAACyAwAgLAAAsgMAIKgCAQAAAAGpAgEAAAAEqgIBAAAABKsCAQAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAsQMAIbACAQAAAAGxAgEAAAABsgIBAAAAAQ4FAAClAwAgKwAAsAMAICwAALADACCoAgEAAAABqQIBAAAABaoCAQAAAAWrAgEAAAABrAIBAAAAAa0CAQAAAAGuAgEAAAABrwIBAK8DACGwAgEAAAABsQIBAAAAAbICAQAAAAEHBQAAogMAICsAAK4DACAsAACuAwAgqAIAAACbAgKpAgAAAJsCCKoCAAAAmwIIrwIAAK0DmwIiBQUAAKIDACArAACsAwAgLAAArAMAIKgCIAAAAAGvAiAAqwMAIQcFAACiAwAgKwAAqgMAICwAAKoDACCoAgAAAJ4CAqkCAAAAngIIqgIAAACeAgivAgAAqQOeAiIHBQAAogMAICsAAKgDACAsAACoAwAgqAIAAACgAgKpAgAAAKACCKoCAAAAoAIIrwIAAKcDoAIiCwUAAKUDACArAACmAwAgLAAApgMAIKgCQAAAAAGpAkAAAAAFqgJAAAAABasCQAAAAAGsAkAAAAABrQJAAAAAAa4CQAAAAAGvAkAApAMAIQsFAACiAwAgKwAAowMAICwAAKMDACCoAkAAAAABqQJAAAAABKoCQAAAAASrAkAAAAABrAJAAAAAAa0CQAAAAAGuAkAAAAABrwJAAKEDACELBQAAogMAICsAAKMDACAsAACjAwAgqAJAAAAAAakCQAAAAASqAkAAAAAEqwJAAAAAAawCQAAAAAGtAkAAAAABrgJAAAAAAa8CQAChAwAhCKgCAgAAAAGpAgIAAAAEqgICAAAABKsCAgAAAAGsAgIAAAABrQICAAAAAa4CAgAAAAGvAgIAogMAIQioAkAAAAABqQJAAAAABKoCQAAAAASrAkAAAAABrAJAAAAAAa0CQAAAAAGuAkAAAAABrwJAAKMDACELBQAApQMAICsAAKYDACAsAACmAwAgqAJAAAAAAakCQAAAAAWqAkAAAAAFqwJAAAAAAawCQAAAAAGtAkAAAAABrgJAAAAAAa8CQACkAwAhCKgCAgAAAAGpAgIAAAAFqgICAAAABasCAgAAAAGsAgIAAAABrQICAAAAAa4CAgAAAAGvAgIApQMAIQioAkAAAAABqQJAAAAABaoCQAAAAAWrAkAAAAABrAJAAAAAAa0CQAAAAAGuAkAAAAABrwJAAKYDACEHBQAAogMAICsAAKgDACAsAACoAwAgqAIAAACgAgKpAgAAAKACCKoCAAAAoAIIrwIAAKcDoAIiBKgCAAAAoAICqQIAAACgAgiqAgAAAKACCK8CAACoA6ACIgcFAACiAwAgKwAAqgMAICwAAKoDACCoAgAAAJ4CAqkCAAAAngIIqgIAAACeAgivAgAAqQOeAiIEqAIAAACeAgKpAgAAAJ4CCKoCAAAAngIIrwIAAKoDngIiBQUAAKIDACArAACsAwAgLAAArAMAIKgCIAAAAAGvAiAAqwMAIQKoAiAAAAABrwIgAKwDACEHBQAAogMAICsAAK4DACAsAACuAwAgqAIAAACbAgKpAgAAAJsCCKoCAAAAmwIIrwIAAK0DmwIiBKgCAAAAmwICqQIAAACbAgiqAgAAAJsCCK8CAACuA5sCIg4FAAClAwAgKwAAsAMAICwAALADACCoAgEAAAABqQIBAAAABaoCAQAAAAWrAgEAAAABrAIBAAAAAa0CAQAAAAGuAgEAAAABrwIBAK8DACGwAgEAAAABsQIBAAAAAbICAQAAAAELqAIBAAAAAakCAQAAAAWqAgEAAAAFqwIBAAAAAawCAQAAAAGtAgEAAAABrgIBAAAAAa8CAQCwAwAhsAIBAAAAAbECAQAAAAGyAgEAAAABDgUAAKIDACArAACyAwAgLAAAsgMAIKgCAQAAAAGpAgEAAAAEqgIBAAAABKsCAQAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAsQMAIbACAQAAAAGxAgEAAAABsgIBAAAAAQuoAgEAAAABqQIBAAAABKoCAQAAAASrAgEAAAABrAIBAAAAAa0CAQAAAAGuAgEAAAABrwIBALIDACGwAgEAAAABsQIBAAAAAbICAQAAAAEWDAAAvQMAIBYAALwDACCRAgAAswMAMJICAACCAwAQkwIAALMDADCUAgEAtAMAIZUCAQC0AwAhlgIBALQDACGXAgEAtQMAIZgCAQC1AwAhmQIBALUDACGbAgAAtgObAiKcAiAAtwMAIZ4CAAC4A54CIqACAAC5A6ACIqECIAC3AwAhogIBALQDACGjAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhC6gCAQAAAAGpAgEAAAAEqgIBAAAABKsCAQAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAsgMAIbACAQAAAAGxAgEAAAABsgIBAAAAAQuoAgEAAAABqQIBAAAABaoCAQAAAAWrAgEAAAABrAIBAAAAAa0CAQAAAAGuAgEAAAABrwIBALADACGwAgEAAAABsQIBAAAAAbICAQAAAAEEqAIAAACbAgKpAgAAAJsCCKoCAAAAmwIIrwIAAK4DmwIiAqgCIAAAAAGvAiAArAMAIQSoAgAAAJ4CAqkCAAAAngIIqgIAAACeAgivAgAAqgOeAiIEqAIAAACgAgKpAgAAAKACCKoCAAAAoAIIrwIAAKgDoAIiCKgCQAAAAAGpAkAAAAAFqgJAAAAABasCQAAAAAGsAkAAAAABrQJAAAAAAa4CQAAAAAGvAkAApgMAIQioAkAAAAABqQJAAAAABKoCQAAAAASrAkAAAAABrAJAAAAAAa0CQAAAAAGuAkAAAAABrwJAAKMDACEVAQAAywMAIAgAAJwEACALAADXAwAgkQIAAJ4EADCSAgAAAwAQkwIAAJ4EADCUAgEAtAMAIZUCAQC0AwAhlgIBALQDACGkAiAAtwMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbQCAQC1AwAhvwIBALQDACHRAgEAtAMAIecCAQC1AwAh6AIBALUDACHpAgAA7AMAIIYDAAADACCHAwAAAwAgFAEAAMsDACAOAADNAwAgEAAAzAMAIJECAADJAwAwkgIAADIAEJMCAADJAwAwlAIBALQDACGVAgEAtAMAIZYCAQC0AwAhpAIgALcDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG0AgEAtQMAIb8CAQC0AwAhwAICAMoDACHBAgIAygMAIcICIAC3AwAhhgMAADIAIIcDAAAyACANkQIAAL4DADCSAgAA_AIAEJMCAAC-AwAwlAIBAJkDACGVAgEAmQMAIZYCAQCaAwAhlwIBAJoDACGlAkAAnwMAIaYCQACgAwAhpwJAAKADACGzAgEAmQMAIbQCAQCaAwAhtQIgAJwDACEOBAAAwAMAIJECAAC_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_AgEAmQMAIdECAQCZAwAh5wIBAJoDACHoAgEAmgMAIekCAADgAwAgDJECAADwAwAwkgIAAMIBABCTAgAA8AMAMJQCAQCZAwAhpQJAAJ8DACGmAkAAoAMAIacCQACgAwAhtQIgAJwDACHrAgAA8QPrAiLsAggAwgMAIe0CQACgAwAh7gIBAJkDACEHBQAAogMAICsAAPMDACAsAADzAwAgqAIAAADrAgKpAgAAAOsCCKoCAAAA6wIIrwIAAPID6wIiBwUAAKIDACArAADzAwAgLAAA8wMAIKgCAAAA6wICqQIAAADrAgiqAgAAAOsCCK8CAADyA-sCIgSoAgAAAOsCAqkCAAAA6wIIqgIAAADrAgivAgAA8wPrAiIOEQAA9wMAIBMAAPgDACCRAgAA9AMAMJICAAAkABCTAgAA9AMAMJQCAQC0AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHrAgAA9QPrAiLsAggA9gMAIe0CQAC7AwAh7gIBALQDACEEqAIAAADrAgKpAgAAAOsCCKoCAAAA6wIIrwIAAPMD6wIiCKgCCAAAAAGpAggAAAAEqgIIAAAABKsCCAAAAAGsAggAAAABrQIIAAAAAa4CCAAAAAGvAggAxAMAIRUKAACVBAAgDQAAkgQAIA8AAJYEACAQAADMAwAgEgAAlwQAIJECAACUBAAwkgIAABUAEJMCAACUBAAwlAIBALQDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACG6AgEAtAMAIfICAQC0AwAh8wIBALQDACH0AgIA1QMAIfUCAgDVAwAh9gICANUDACH3AkAAugMAIYYDAAAVACCHAwAAFQAgA7YCAAAmACC3AgAAJgAguAIAACYAIAuRAgAA-QMAMJICAACqAQAQkwIAAPkDADCUAgEAmQMAIZUCAQCZAwAhpQJAAJ8DACGmAkAAoAMAIbUCIACcAwAhzgIBAJkDACHvAgEAmQMAIfACQACgAwAhB5ECAAD6AwAwkgIAAJQBABCTAgAA-gMAMJQCAQCZAwAhoAIAAPsD8gIiuQIBAJkDACHuAgEAmQMAIQcFAACiAwAgKwAA_QMAICwAAP0DACCoAgAAAPICAqkCAAAA8gIIqgIAAADyAgivAgAA_APyAiIHBQAAogMAICsAAP0DACAsAAD9AwAgqAIAAADyAgKpAgAAAPICCKoCAAAA8gIIrwIAAPwD8gIiBKgCAAAA8gICqQIAAADyAgiqAgAAAPICCK8CAAD9A_ICIg6RAgAA_gMAMJICAAB-ABCTAgAA_gMAMJQCAQCZAwAhpgJAAKADACGnAkAAoAMAIbUCIACcAwAhugIBAJkDACHyAgEAmQMAIfMCAQCZAwAh9AICAM8DACH1AgIAzwMAIfYCAgDPAwAh9wJAAJ8DACENkQIAAP8DADCSAgAAaAAQkwIAAP8DADCUAgEAmQMAIaUCQACfAwAhpgJAAKADACGnAkAAoAMAIbUCIACcAwAhzgIBAJkDACH4AgEAmQMAIfkCCADCAwAh-gICAM8DACH7AgEAmQMAIQyRAgAAgAQAMJICAABSABCTAgAAgAQAMJQCAQCZAwAhoAIAAIEE_gIipQJAAJ8DACGmAkAAoAMAIacCQACgAwAhtQIgAJwDACHIAgEAmQMAIfwCQACgAwAh_gIBAJoDACEHBQAAogMAICsAAIMEACAsAACDBAAgqAIAAAD-AgKpAgAAAP4CCKoCAAAA_gIIrwIAAIIE_gIiBwUAAKIDACArAACDBAAgLAAAgwQAIKgCAAAA_gICqQIAAAD-AgiqAgAAAP4CCK8CAACCBP4CIgSoAgAAAP4CAqkCAAAA_gIIqgIAAAD-AgivAgAAgwT-AiINEAAA7gMAIJECAACEBAAwkgIAADoAEJMCAACEBAAwlAIBALQDACGgAgAAhQT-AiKlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIcgCAQC0AwAh_AJAALsDACH-AgEAtQMAIQSoAgAAAP4CAqkCAAAA_gIIqgIAAAD-AgivAgAAgwT-AiICxwIBAAAAAcgCAQAAAAEREAAA7gMAIBIAAIkEACCRAgAAhwQAMJICAAAmABCTAgAAhwQAMJQCAQC0AwAhoAIAAIgEzQIipQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHHAgEAtAMAIcgCAQC0AwAhyQIIAPYDACHKAgEAtAMAIcsCCAD2AwAhzQJAALoDACEEqAIAAADNAgKpAgAAAM0CCKoCAAAAzQIIrwIAANsDzQIiEBEAAPcDACATAAD4AwAgkQIAAPQDADCSAgAAJAAQkwIAAPQDADCUAgEAtAMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAh6wIAAPUD6wIi7AIIAPYDACHtAkAAuwMAIe4CAQC0AwAhhgMAACQAIIcDAAAkACACuQIBAAAAAe4CAQAAAAEMDAAAjQQAIBEAAPcDACATAAD4AwAgFwAAjgQAIBgAAI8EACCRAgAAiwQAMJICAAAgABCTAgAAiwQAMJQCAQC0AwAhoAIAAIwE8gIiuQIBALQDACHuAgEAtAMAIQSoAgAAAPICAqkCAAAA8gIIqgIAAADyAgivAgAA_QPyAiIUAQAAywMAIA4AAM0DACAQAADMAwAgkQIAAMkDADCSAgAAMgAQkwIAAMkDADCUAgEAtAMAIZUCAQC0AwAhlgIBALQDACGkAiAAtwMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbQCAQC1AwAhvwIBALQDACHAAgIAygMAIcECAgDKAwAhwgIgALcDACGGAwAAMgAghwMAADIAIBgQAADuAwAgkQIAAOkDADCSAgAAOAAQkwIAAOkDADCUAgEAtAMAIaACAADqA9MCIqYCQAC7AwAhpwJAALsDACHTAhAA6wMAIdQCAQC0AwAh1QIBALQDACHWAgEAtAMAIdcCAQC1AwAh2AIBALUDACHZAgEAtQMAIdoCAQC1AwAh2wIAAOwDACDcAgEAtQMAId0CEADtAwAh3gIBALUDACHfAgEAtQMAIeACAQC0AwAhhgMAADgAIIcDAAA4ACADtgIAADoAILcCAAA6ACC4AgAAOgAgArkCAQAAAAG6AgEAAAABEAwAAI0EACANAACSBAAgkQIAAJEEADCSAgAAGgAQkwIAAJEEADCUAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhuQIBALQDACG6AgEAtAMAIbsCCAD2AwAhvAIIAPYDACG9AggA9gMAIb4CCAD2AwAhEQsAANcDACAOAADNAwAgkQIAANQDADCSAgAAogIAEJMCAADUAwAwlAIBALQDACGVAgEAtAMAIaACAADWA8cCIqUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhwwICANUDACHEAkAAuwMAIcUCQAC7AwAhhgMAAKICACCHAwAAogIAIAK6AgEAAAAB8gIBAAAAARMKAACVBAAgDQAAkgQAIA8AAJYEACAQAADMAwAgEgAAlwQAIJECAACUBAAwkgIAABUAEJMCAACUBAAwlAIBALQDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACG6AgEAtAMAIfICAQC0AwAh8wIBALQDACH0AgIA1QMAIfUCAgDVAwAh9gICANUDACH3AkAAugMAIREJAACaBAAgCwAA1wMAIJECAACZBAAwkgIAABEAEJMCAACZBAAwlAIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAh-AIBALQDACH5AggA9gMAIfoCAgDVAwAh-wIBALQDACGGAwAAEQAghwMAABEAIBUBAADLAwAgCAAAnAQAIAsAANcDACCRAgAAngQAMJICAAADABCTAgAAngQAMJQCAQC0AwAhlQIBALQDACGWAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtAIBALUDACG_AgEAtAMAIdECAQC0AwAh5wIBALUDACHoAgEAtQMAIekCAADsAwAghgMAAAMAIIcDAAADACAQEQAA9wMAIBMAAPgDACCRAgAA9AMAMJICAAAkABCTAgAA9AMAMJQCAQC0AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHrAgAA9QPrAiLsAggA9gMAIe0CQAC7AwAh7gIBALQDACGGAwAAJAAghwMAACQAIALOAgEAAAAB-wIBAAAAAQ8JAACaBAAgCwAA1wMAIJECAACZBAAwkgIAABEAEJMCAACZBAAwlAIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAh-AIBALQDACH5AggA9gMAIfoCAgDVAwAh-wIBALQDACERCAAAnAQAIBQAAJ0EACCRAgAAmwQAMJICAAANABCTAgAAmwQAMJQCAQC0AwAhlQIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAhzwICANUDACHQAggA9gMAIdECAQC0AwAhhgMAAA0AIIcDAAANACAPCAAAnAQAIBQAAJ0EACCRAgAAmwQAMJICAAANABCTAgAAmwQAMJQCAQC0AwAhlQIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAhzwICANUDACHQAggA9gMAIdECAQC0AwAhEAYAAKEEACAHAACiBAAgFQAAowQAIJECAACgBAAwkgIAAAUAEJMCAACgBAAwlAIBALQDACGVAgEAtAMAIaUCQAC6AwAhpgJAALsDACG1AiAAtwMAIc4CAQC0AwAh7wIBALQDACHwAkAAuwMAIYYDAAAFACCHAwAABQAgA7YCAAARACC3AgAAEQAguAIAABEAIBMBAADLAwAgCAAAnAQAIAsAANcDACCRAgAAngQAMJICAAADABCTAgAAngQAMJQCAQC0AwAhlQIBALQDACGWAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtAIBALUDACG_AgEAtAMAIdECAQC0AwAh5wIBALUDACHoAgEAtQMAIekCAADsAwAgAs4CAQAAAAHvAgEAAAABDgYAAKEEACAHAACiBAAgFQAAowQAIJECAACgBAAwkgIAAAUAEJMCAACgBAAwlAIBALQDACGVAgEAtAMAIaUCQAC6AwAhpgJAALsDACG1AiAAtwMAIc4CAQC0AwAh7wIBALQDACHwAkAAuwMAIRAEAADAAwAgkQIAAL8DADCSAgAA6QIAEJMCAAC_AwAwlAIBALQDACGVAgEAtAMAIZYCAQC1AwAhlwIBALUDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACGzAgEAtAMAIbQCAQC1AwAhtQIgALcDACGGAwAA6QIAIIcDAADpAgAgA7YCAAADACC3AgAAAwAguAIAAAMAIAO2AgAADQAgtwIAAA0AILgCAAANACACyAIBAAAAAfwCQAAAAAEAAAAAAY4DAQAAAAEBjgMBAAAAAQGOAwAAAJsCAgGOAyAAAAABAY4DAAAAngICAY4DAAAAoAICAY4DQAAAAAEBjgNAAAAAAQclAACFBQAgJgAAiAUAIIgDAACGBQAgiQMAAIcFACCKAwAAAwAgiwMAAAMAIIwDAAALACAHJQAAswQAICYAALYEACCIAwAAtAQAIIkDAAC1BAAgigMAADIAIIsDAAAyACCMAwAAuAIAIA0OAACEBQAgEAAAgwUAIJQCAQAAAAGVAgEAAAABlgIBAAAAAaQCIAAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG0AgEAAAABwAICAAAAAcECAgAAAAHCAiAAAAABAgAAALgCACAlAACzBAAgAwAAADIAICUAALMEACAmAAC3BAAgDwAAADIAIA4AALoEACAQAAC5BAAgHgAAtwQAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACHAAgIAuAQAIcECAgC4BAAhwgIgAKwEACENDgAAugQAIBAAALkEACCUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhwAICALgEACHBAgIAuAQAIcICIACsBAAhBY4DAgAAAAGRAwIAAAABkgMCAAAAAZMDAgAAAAGUAwIAAAABCyUAAMoEADAmAADPBAAwiAMAAMsEADCJAwAAzAQAMIoDAADOBAAwiwMAAM4EADCMAwAAzgQAMI0DAADNBAAgjgMAAM4EADCPAwAA0AQAMJADAADRBAAwCyUAALsEADAmAADABAAwiAMAALwEADCJAwAAvQQAMIoDAAC_BAAwiwMAAL8EADCMAwAAvwQAMI0DAAC-BAAgjgMAAL8EADCPAwAAwQQAMJADAADCBAAwCw0AAMkEACCUAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAboCAQAAAAG7AggAAAABvAIIAAAAAb0CCAAAAAG-AggAAAABAgAAABwAICUAAMgEACADAAAAHAAgJQAAyAQAICYAAMYEACABHgAA6QcAMBEMAACNBAAgDQAAkgQAIJECAACRBAAwkgIAABoAEJMCAACRBAAwlAIBAAAAAaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhuQIBALQDACG6AgEAtAMAIbsCCAD2AwAhvAIIAPYDACG9AggA9gMAIb4CCAD2AwAhgQMAAJAEACACAAAAHAAgHgAAxgQAIAIAAADDBAAgHgAAxAQAIA6RAgAAwgQAMJICAADDBAAQkwIAAMIEADCUAgEAtAMAIaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhuQIBALQDACG6AgEAtAMAIbsCCAD2AwAhvAIIAPYDACG9AggA9gMAIb4CCAD2AwAhDpECAADCBAAwkgIAAMMEABCTAgAAwgQAMJQCAQC0AwAhpAIgALcDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG5AgEAtAMAIboCAQC0AwAhuwIIAPYDACG8AggA9gMAIb0CCAD2AwAhvgIIAPYDACEKlAIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIboCAQCpBAAhuwIIAMUEACG8AggAxQQAIb0CCADFBAAhvgIIAMUEACEFjgMIAAAAAZEDCAAAAAGSAwgAAAABkwMIAAAAAZQDCAAAAAELDQAAxwQAIJQCAQCpBAAhpAIgAKwEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG6AgEAqQQAIbsCCADFBAAhvAIIAMUEACG9AggAxQQAIb4CCADFBAAhBSUAAOQHACAmAADnBwAgiAMAAOUHACCJAwAA5gcAIIwDAACfAgAgCw0AAMkEACCUAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAboCAQAAAAG7AggAAAABvAIIAAAAAb0CCAAAAAG-AggAAAABAyUAAOQHACCIAwAA5QcAIIwDAACfAgAgBxEAAP8EACATAACCBQAgFwAAgAUAIBgAAIEFACCUAgEAAAABoAIAAADyAgLuAgEAAAABAgAAACIAICUAAP4EACADAAAAIgAgJQAA_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_gIBAAAAAQIAAAABACAlAAD1BAAgAwAAAAEAICUAAPUEACAmAAD0BAAgAR4AANkHADAOEAAA7gMAIJECAACEBAAwkgIAADoAEJMCAACEBAAwlAIBAAAAAaACAACFBP4CIqUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhyAIBALQDACH8AkAAuwMAIf4CAQC1AwAhhQMAAKQEACACAAAAAQAgHgAA9AQAIAIAAADxBAAgHgAA8gQAIAyRAgAA8AQAMJICAADxBAAQkwIAAPAEADCUAgEAtAMAIaACAACFBP4CIqUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhyAIBALQDACH8AkAAuwMAIf4CAQC1AwAhDJECAADwBAAwkgIAAPEEABCTAgAA8AQAMJQCAQC0AwAhoAIAAIUE_gIipQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHIAgEAtAMAIfwCQAC7AwAh_gIBALUDACEIlAIBAKkEACGgAgAA8wT-AiKlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIfwCQACwBAAh_gIBAKoEACEBjgMAAAD-AgIIlAIBAKkEACGgAgAA8wT-AiKlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIfwCQACwBAAh_gIBAKoEACEIlAIBAAAAAaACAAAA_gICpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAfwCQAAAAAH-AgEAAAABEZQCAQAAAAGgAgAAANMCAqYCQAAAAAGnAkAAAAAB0wIQAAAAAdQCAQAAAAHVAgEAAAAB1gIBAAAAAdcCAQAAAAHYAgEAAAAB2QIBAAAAAdoCAQAAAAHbAoAAAAAB3AIBAAAAAd0CEAAAAAHeAgEAAAAB3wIBAAAAAQIAAADbAQAgJQAA9gQAIAMAAAA4ACAlAAD2BAAgJgAA-gQAIBMAAAA4ACAeAAD6BAAglAIBAKkEACGgAgAA-wTTAiKmAkAAsAQAIacCQACwBAAh0wIQAPwEACHUAgEAqQQAIdUCAQCpBAAh1gIBAKkEACHXAgEAqgQAIdgCAQCqBAAh2QIBAKoEACHaAgEAqgQAIdsCgAAAAAHcAgEAqgQAId0CEAD9BAAh3gIBAKoEACHfAgEAqgQAIRGUAgEAqQQAIaACAAD7BNMCIqYCQACwBAAhpwJAALAEACHTAhAA_AQAIdQCAQCpBAAh1QIBAKkEACHWAgEAqQQAIdcCAQCqBAAh2AIBAKoEACHZAgEAqgQAIdoCAQCqBAAh2wKAAAAAAdwCAQCqBAAh3QIQAP0EACHeAgEAqgQAId8CAQCqBAAhAY4DAAAA0wICBY4DEAAAAAGRAxAAAAABkgMQAAAAAZMDEAAAAAGUAxAAAAABBY4DEAAAAAGRAxAAAAABkgMQAAAAAZMDEAAAAAGUAxAAAAABBxEAAP8EACATAACCBQAgFwAAgAUAIBgAAIEFACCUAgEAAAABoAIAAADyAgLuAgEAAAABAyUAANcHACCIAwAA2AcAIIwDAAAXACADJQAA9gQAIIgDAAD3BAAgjAMAANsBACAEJQAA6QQAMIgDAADqBAAwjAMAAO0EADCNAwAA7AQAIAQlAADaBAAwiAMAANsEADCMAwAA3gQAMI0DAADdBAAgBCUAAMoEADCIAwAAywQAMIwDAADOBAAwjQMAAM0EACAEJQAAuwQAMIgDAAC8BAAwjAMAAL8EADCNAwAAvgQAIA4IAAC_BQAgCwAAwAUAIJQCAQAAAAGVAgEAAAABlgIBAAAAAaQCIAAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG0AgEAAAAB0QIBAAAAAecCAQAAAAHoAgEAAAAB6QKAAAAAAQIAAAALACAlAACFBQAgAwAAAAMAICUAAIUFACAmAACJBQAgEAAAAAMAIAgAAIoFACALAACLBQAgHgAAiQUAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACHRAgEAqQQAIecCAQCqBAAh6AIBAKoEACHpAoAAAAABDggAAIoFACALAACLBQAglAIBAKkEACGVAgEAqQQAIZYCAQCpBAAhpAIgAKwEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG0AgEAqgQAIdECAQCpBAAh5wIBAKoEACHoAgEAqgQAIekCgAAAAAEFJQAAuwcAICYAANUHACCIAwAAvAcAIIkDAADUBwAgjAMAAAcAIAslAACMBQAwJgAAkQUAMIgDAACNBQAwiQMAAI4FADCKAwAAkAUAMIsDAACQBQAwjAMAAJAFADCNAwAAjwUAII4DAACQBQAwjwMAAJIFADCQAwAAkwUAMA4KAAC7BQAgDQAAvAUAIBAAAL0FACASAAC-BQAglAIBAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAboCAQAAAAHyAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQIAAAAXACAlAAC6BQAgAwAAABcAICUAALoFACAmAACXBQAgAR4AANMHADAUCgAAlQQAIA0AAJIEACAPAACWBAAgEAAAzAMAIBIAAJcEACCRAgAAlAQAMJICAAAVABCTAgAAlAQAMJQCAQAAAAGmAkAAuwMAIacCQAC7AwAhtQIgALcDACG6AgEAtAMAIfICAQC0AwAh8wIBALQDACH0AgIA1QMAIfUCAgDVAwAh9gICANUDACH3AkAAugMAIYIDAACTBAAgAgAAABcAIB4AAJcFACACAAAAlAUAIB4AAJUFACAOkQIAAJMFADCSAgAAlAUAEJMCAACTBQAwlAIBALQDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACG6AgEAtAMAIfICAQC0AwAh8wIBALQDACH0AgIA1QMAIfUCAgDVAwAh9gICANUDACH3AkAAugMAIQ6RAgAAkwUAMJICAACUBQAQkwIAAJMFADCUAgEAtAMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIboCAQC0AwAh8gIBALQDACHzAgEAtAMAIfQCAgDVAwAh9QICANUDACH2AgIA1QMAIfcCQAC6AwAhCpQCAQCpBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhugIBAKkEACHyAgEAqQQAIfQCAgCWBQAh9QICAJYFACH2AgIAlgUAIfcCQACvBAAhBY4DAgAAAAGRAwIAAAABkgMCAAAAAZMDAgAAAAGUAwIAAAABDgoAAJgFACANAACZBQAgEAAAmgUAIBIAAJsFACCUAgEAqQQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIboCAQCpBAAh8gIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQUlAAC_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_QUAMCYAAIIGADCIAwAA_gUAMIkDAAD_BQAwigMAAIEGADCLAwAAgQYAMIwDAACBBgAwjQMAAIAGACCOAwAAgQYAMI8DAACDBgAwkAMAAIQGADALJQAA1gUAMCYAANsFADCIAwAA1wUAMIkDAADYBQAwigMAANoFADCLAwAA2gUAMIwDAADaBQAwjQMAANkFACCOAwAA2gUAMI8DAADcBQAwkAMAAN0FADAKFAAA_AUAIJQCAQAAAAGVAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAc4CAQAAAAHPAgIAAAAB0AIIAAAAAQIAAAAPACAlAAD7BQAgAwAAAA8AICUAAPsFACAmAADgBQAgAR4AALkHADAPCAAAnAQAIBQAAJ0EACCRAgAAmwQAMJICAAANABCTAgAAmwQAMJQCAQAAAAGVAgEAtAMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhzgIBAAAAAc8CAgDVAwAh0AIIAPYDACHRAgEAtAMAIQIAAAAPACAeAADgBQAgAgAAAN4FACAeAADfBQAgDZECAADdBQAwkgIAAN4FABCTAgAA3QUAMJQCAQC0AwAhlQIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAhzwICANUDACHQAggA9gMAIdECAQC0AwAhDZECAADdBQAwkgIAAN4FABCTAgAA3QUAMJQCAQC0AwAhlQIBALQDACGlAkAAugMAIaYCQAC7AwAhpwJAALsDACG1AiAAtwMAIc4CAQC0AwAhzwICANUDACHQAggA9gMAIdECAQC0AwAhCZQCAQCpBAAhlQIBAKkEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIc4CAQCpBAAhzwICAJYFACHQAggAxQQAIQoUAADhBQAglAIBAKkEACGVAgEAqQQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhzgIBAKkEACHPAgIAlgUAIdACCADFBAAhCyUAAOIFADAmAADnBQAwiAMAAOMFADCJAwAA5AUAMIoDAADmBQAwiwMAAOYFADCMAwAA5gUAMI0DAADlBQAgjgMAAOYFADCPAwAA6AUAMJADAADpBQAwCgsAAPoFACCUAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAc4CAQAAAAH4AgEAAAAB-QIIAAAAAfoCAgAAAAECAAAAEwAgJQAA-QUAIAMAAAATACAlAAD5BQAgJgAA7AUAIAEeAAC4BwAwEAkAAJoEACALAADXAwAgkQIAAJkEADCSAgAAEQAQkwIAAJkEADCUAgEAAAABpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtQIgALcDACHOAgEAtAMAIfgCAQC0AwAh-QIIAPYDACH6AgIA1QMAIfsCAQC0AwAhgwMAAJgEACACAAAAEwAgHgAA7AUAIAIAAADqBQAgHgAA6wUAIA2RAgAA6QUAMJICAADqBQAQkwIAAOkFADCUAgEAtAMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhzgIBALQDACH4AgEAtAMAIfkCCAD2AwAh-gICANUDACH7AgEAtAMAIQ2RAgAA6QUAMJICAADqBQAQkwIAAOkFADCUAgEAtAMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbUCIAC3AwAhzgIBALQDACH4AgEAtAMAIfkCCAD2AwAh-gICANUDACH7AgEAtAMAIQmUAgEAqQQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhzgIBAKkEACH4AgEAqQQAIfkCCADFBAAh-gICAJYFACEKCwAA7QUAIJQCAQCpBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACHOAgEAqQQAIfgCAQCpBAAh-QIIAMUEACH6AgIAlgUAIQslAADuBQAwJgAA8gUAMIgDAADvBQAwiQMAAPAFADCKAwAAkAUAMIsDAACQBQAwjAMAAJAFADCNAwAA8QUAII4DAACQBQAwjwMAAPMFADCQAwAAkwUAMA4NAAC8BQAgDwAA-AUAIBAAAL0FACASAAC-BQAglAIBAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAboCAQAAAAHzAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQIAAAAXACAlAAD3BQAgAwAAABcAICUAAPcFACAmAAD1BQAgAR4AALcHADACAAAAFwAgHgAA9QUAIAIAAACUBQAgHgAA9AUAIAqUAgEAqQQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIboCAQCpBAAh8wIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQ4NAACZBQAgDwAA9gUAIBAAAJoFACASAACbBQAglAIBAKkEACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACG6AgEAqQQAIfMCAQCpBAAh9AICAJYFACH1AgIAlgUAIfYCAgCWBQAh9wJAAK8EACEFJQAAsgcAICYAALUHACCIAwAAswcAIIkDAAC0BwAgjAMAAAsAIA4NAAC8BQAgDwAA-AUAIBAAAL0FACASAAC-BQAglAIBAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAboCAQAAAAHzAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQMlAACyBwAgiAMAALMHACCMAwAACwAgCgsAAPoFACCUAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAc4CAQAAAAH4AgEAAAAB-QIIAAAAAfoCAgAAAAEEJQAA7gUAMIgDAADvBQAwjAMAAJAFADCNAwAA8QUAIAoUAAD8BQAglAIBAAAAAZUCAQAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG1AiAAAAABzgIBAAAAAc8CAgAAAAHQAggAAAABBCUAAOIFADCIAwAA4wUAMIwDAADmBQAwjQMAAOUFACAOAQAAigYAIAsAAMAFACCUAgEAAAABlQIBAAAAAZYCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtAIBAAAAAb8CAQAAAAHnAgEAAAAB6AIBAAAAAekCgAAAAAECAAAACwAgJQAAiQYAIAMAAAALACAlAACJBgAgJgAAhwYAIAEeAACxBwAwEwEAAMsDACAIAACcBAAgCwAA1wMAIJECAACeBAAwkgIAAAMAEJMCAACeBAAwlAIBAAAAAZUCAQC0AwAhlgIBAAAAAaQCIAC3AwAhpQJAALoDACGmAkAAuwMAIacCQAC7AwAhtAIBALUDACG_AgEAAAAB0QIBALQDACHnAgEAtQMAIegCAQC1AwAh6QIAAOwDACACAAAACwAgHgAAhwYAIAIAAACFBgAgHgAAhgYAIBCRAgAAhAYAMJICAACFBgAQkwIAAIQGADCUAgEAtAMAIZUCAQC0AwAhlgIBALQDACGkAiAAtwMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbQCAQC1AwAhvwIBALQDACHRAgEAtAMAIecCAQC1AwAh6AIBALUDACHpAgAA7AMAIBCRAgAAhAYAMJICAACFBgAQkwIAAIQGADCUAgEAtAMAIZUCAQC0AwAhlgIBALQDACGkAiAAtwMAIaUCQAC6AwAhpgJAALsDACGnAkAAuwMAIbQCAQC1AwAhvwIBALQDACHRAgEAtAMAIecCAQC1AwAh6AIBALUDACHpAgAA7AMAIAyUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhvwIBAKkEACHnAgEAqgQAIegCAQCqBAAh6QKAAAAAAQ4BAACIBgAgCwAAiwUAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACG_AgEAqQQAIecCAQCqBAAh6AIBAKoEACHpAoAAAAABBSUAAKwHACAmAACvBwAgiAMAAK0HACCJAwAArgcAIIwDAAD_AgAgDgEAAIoGACALAADABQAglAIBAAAAAZUCAQAAAAGWAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbQCAQAAAAG_AgEAAAAB5wIBAAAAAegCAQAAAAHpAoAAAAABAyUAAKwHACCIAwAArQcAIIwDAAD_AgAgCQcAAIwGACAVAACNBgAglAIBAAAAAZUCAQAAAAGlAkAAAAABpgJAAAAAAbUCIAAAAAHOAgEAAAAB8AJAAAAAAQQlAAD9BQAwiAMAAP4FADCMAwAAgQYAMI0DAACABgAgBCUAANYFADCIAwAA1wUAMIwDAADaBQAwjQMAANkFACAEJQAAyQUAMIgDAADKBQAwjAMAAM0FADCNAwAAzAUAIAAAAAAAAAUlAACnBwAgJgAAqgcAIIgDAACoBwAgiQMAAKkHACCMAwAAuAIAIAMlAACnBwAgiAMAAKgHACCMAwAAuAIAIAAAAAAABSUAAKIHACAmAAClBwAgiAMAAKMHACCJAwAApAcAIIwDAAD_AgAgAyUAAKIHACCIAwAAowcAIIwDAAD_AgAgBgwAAMQFACAWAADDBQAglwIAAKUEACCYAgAApQQAIJkCAAClBAAgpQIAAKUEACAAAAAAAAAAAY4DAAAAxwICCyUAALIGADAmAAC2BgAwiAMAALMGADCJAwAAtAYAMIoDAACQBQAwiwMAAJAFADCMAwAAkAUAMI0DAAC1BgAgjgMAAJAFADCPAwAAtwYAMJADAACTBQAwCyUAAKkGADAmAACtBgAwiAMAAKoGADCJAwAAqwYAMIoDAAC_BAAwiwMAAL8EADCMAwAAvwQAMI0DAACsBgAgjgMAAL8EADCPAwAArgYAMJADAADCBAAwCwwAAJYGACCUAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbkCAQAAAAG7AggAAAABvAIIAAAAAb0CCAAAAAG-AggAAAABAgAAABwAICUAALEGACADAAAAHAAgJQAAsQYAICYAALAGACABHgAAoQcAMAIAAAAcACAeAACwBgAgAgAAAMMEACAeAACvBgAgCpQCAQCpBAAhpAIgAKwEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG5AgEAqQQAIbsCCADFBAAhvAIIAMUEACG9AggAxQQAIb4CCADFBAAhCwwAAJUGACCUAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhuQIBAKkEACG7AggAxQQAIbwCCADFBAAhvQIIAMUEACG-AggAxQQAIQsMAACWBgAglAIBAAAAAaQCIAAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG5AgEAAAABuwIIAAAAAbwCCAAAAAG9AggAAAABvgIIAAAAAQ4KAAC7BQAgDwAA-AUAIBAAAL0FACASAAC-BQAglAIBAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAfICAQAAAAHzAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQIAAAAXACAlAAC6BgAgAwAAABcAICUAALoGACAmAAC5BgAgAR4AAKAHADACAAAAFwAgHgAAuQYAIAIAAACUBQAgHgAAuAYAIAqUAgEAqQQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIfICAQCpBAAh8wIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQ4KAACYBQAgDwAA9gUAIBAAAJoFACASAACbBQAglAIBAKkEACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACHyAgEAqQQAIfMCAQCpBAAh9AICAJYFACH1AgIAlgUAIfYCAgCWBQAh9wJAAK8EACEOCgAAuwUAIA8AAPgFACAQAAC9BQAgEgAAvgUAIJQCAQAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHyAgEAAAAB8wIBAAAAAfQCAgAAAAH1AgIAAAAB9gICAAAAAfcCQAAAAAEEJQAAsgYAMIgDAACzBgAwjAMAAJAFADCNAwAAtQYAIAQlAACpBgAwiAMAAKoGADCMAwAAvwQAMI0DAACsBgAgAAAAAAAAAAAAAAAFJQAAmwcAICYAAJ4HACCIAwAAnAcAIIkDAACdBwAgjAMAAAcAIAMlAACbBwAgiAMAAJwHACCMAwAABwAgAAAAAAAFJQAAlgcAICYAAJkHACCIAwAAlwcAIIkDAACYBwAgjAMAACIAIAMlAACWBwAgiAMAAJcHACCMAwAAIgAgBQwAAMQFACARAADcBgAgEwAA3QYAIBcAAPgGACAYAAD5BgAgAAAAAAAAAAAFJQAAkQcAICYAAJQHACCIAwAAkgcAIIkDAACTBwAgjAMAABcAIAMlAACRBwAgiAMAAJIHACCMAwAAFwAgBgoAAPsGACANAAD6BgAgDwAAwwUAIBAAAJ8GACASAAD3BgAg9wIAAKUEACAAAAAABSUAAIwHACAmAACPBwAgiAMAAI0HACCJAwAAjgcAIIwDAADmAgAgAyUAAIwHACCIAwAAjQcAIIwDAADmAgAgAAAAAAAAAAAAAAAAAAUlAACHBwAgJgAAigcAIIgDAACIBwAgiQMAAIkHACCMAwAADwAgAyUAAIcHACCIAwAAiAcAIIwDAAAPACAAAAAFJQAAggcAICYAAIUHACCIAwAAgwcAIIkDAACEBwAgjAMAACIAIAMlAACCBwAgiAMAAIMHACCMAwAAIgAgAxEAANwGACATAADdBgAgpQIAAKUEACAKEAAA0QYAINcCAAClBAAg2AIAAKUEACDZAgAApQQAINoCAAClBAAg2wIAAKUEACDcAgAApQQAIN0CAAClBAAg3gIAAKUEACDfAgAApQQAIAADCwAAvQYAIA4AAKAGACClAgAApQQAIAMJAAD8BgAgCwAAvQYAIKUCAAClBAAgAwgAAP0GACAUAAD-BgAgpQIAAKUEACAEBgAA_wYAIAcAAIAHACAVAACBBwAgpQIAAKUEACAABQQAAI8GACCWAgAApQQAIJcCAAClBAAgpQIAAKUEACC0AgAApQQAIAAACAwAALkFACARAAD_BAAgEwAAggUAIBcAAIAFACCUAgEAAAABoAIAAADyAgK5AgEAAAAB7gIBAAAAAQIAAAAiACAlAACCBwAgAwAAACAAICUAAIIHACAmAACGBwAgCgAAACAAIAwAALcFACARAADWBAAgEwAA2QQAIBcAANcEACAeAACGBwAglAIBAKkEACGgAgAA1ATyAiK5AgEAqQQAIe4CAQCpBAAhCAwAALcFACARAADWBAAgEwAA2QQAIBcAANcEACCUAgEAqQQAIaACAADUBPICIrkCAQCpBAAh7gIBAKkEACELCAAAyQYAIJQCAQAAAAGVAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAc4CAQAAAAHPAgIAAAAB0AIIAAAAAdECAQAAAAECAAAADwAgJQAAhwcAIAMAAAANACAlAACHBwAgJgAAiwcAIA0AAAANACAIAADIBgAgHgAAiwcAIJQCAQCpBAAhlQIBAKkEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIc4CAQCpBAAhzwICAJYFACHQAggAxQQAIdECAQCpBAAhCwgAAMgGACCUAgEAqQQAIZUCAQCpBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACHOAgEAqQQAIc8CAgCWBQAh0AIIAMUEACHRAgEAqQQAIQqUAgEAAAABlQIBAAAAAZYCAQAAAAGXAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABswIBAAAAAbQCAQAAAAG1AiAAAAABAgAAAOYCACAlAACMBwAgAwAAAOkCACAlAACMBwAgJgAAkAcAIAwAAADpAgAgHgAAkAcAIJQCAQCpBAAhlQIBAKkEACGWAgEAqgQAIZcCAQCqBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhswIBAKkEACG0AgEAqgQAIbUCIACsBAAhCpQCAQCpBAAhlQIBAKkEACGWAgEAqgQAIZcCAQCqBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhswIBAKkEACG0AgEAqgQAIbUCIACsBAAhDwoAALsFACANAAC8BQAgDwAA-AUAIBAAAL0FACCUAgEAAAABpgJAAAAAAacCQAAAAAG1AiAAAAABugIBAAAAAfICAQAAAAHzAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQIAAAAXACAlAACRBwAgAwAAABUAICUAAJEHACAmAACVBwAgEQAAABUAIAoAAJgFACANAACZBQAgDwAA9gUAIBAAAJoFACAeAACVBwAglAIBAKkEACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACG6AgEAqQQAIfICAQCpBAAh8wIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQ8KAACYBQAgDQAAmQUAIA8AAPYFACAQAACaBQAglAIBAKkEACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACG6AgEAqQQAIfICAQCpBAAh8wIBAKkEACH0AgIAlgUAIfUCAgCWBQAh9gICAJYFACH3AkAArwQAIQgMAAC5BQAgEQAA_wQAIBMAAIIFACAYAACBBQAglAIBAAAAAaACAAAA8gICuQIBAAAAAe4CAQAAAAECAAAAIgAgJQAAlgcAIAMAAAAgACAlAACWBwAgJgAAmgcAIAoAAAAgACAMAAC3BQAgEQAA1gQAIBMAANkEACAYAADYBAAgHgAAmgcAIJQCAQCpBAAhoAIAANQE8gIiuQIBAKkEACHuAgEAqQQAIQgMAAC3BQAgEQAA1gQAIBMAANkEACAYAADYBAAglAIBAKkEACGgAgAA1ATyAiK5AgEAqQQAIe4CAQCpBAAhCgYAAOIGACAHAACMBgAglAIBAAAAAZUCAQAAAAGlAkAAAAABpgJAAAAAAbUCIAAAAAHOAgEAAAAB7wIBAAAAAfACQAAAAAECAAAABwAgJQAAmwcAIAMAAAAFACAlAACbBwAgJgAAnwcAIAwAAAAFACAGAADhBgAgBwAA1AUAIB4AAJ8HACCUAgEAqQQAIZUCAQCpBAAhpQJAAK8EACGmAkAAsAQAIbUCIACsBAAhzgIBAKkEACHvAgEAqQQAIfACQACwBAAhCgYAAOEGACAHAADUBQAglAIBAKkEACGVAgEAqQQAIaUCQACvBAAhpgJAALAEACG1AiAArAQAIc4CAQCpBAAh7wIBAKkEACHwAkAAsAQAIQqUAgEAAAABpgJAAAAAAacCQAAAAAG1AiAAAAAB8gIBAAAAAfMCAQAAAAH0AgIAAAAB9QICAAAAAfYCAgAAAAH3AkAAAAABCpQCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABuQIBAAAAAbsCCAAAAAG8AggAAAABvQIIAAAAAb4CCAAAAAESFgAAwQUAIJQCAQAAAAGVAgEAAAABlgIBAAAAAZcCAQAAAAGYAgEAAAABmQIBAAAAAZsCAAAAmwICnAIgAAAAAZ4CAAAAngICoAIAAACgAgKhAiAAAAABogIBAAAAAaMCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABAgAAAP8CACAlAACiBwAgAwAAAIIDACAlAACiBwAgJgAApgcAIBQAAACCAwAgFgAAsQQAIB4AAKYHACCUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGXAgEAqgQAIZgCAQCqBAAhmQIBAKoEACGbAgAAqwSbAiKcAiAArAQAIZ4CAACtBJ4CIqACAACuBKACIqECIACsBAAhogIBAKkEACGjAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhEhYAALEEACCUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGXAgEAqgQAIZgCAQCqBAAhmQIBAKoEACGbAgAAqwSbAiKcAiAArAQAIZ4CAACtBJ4CIqACAACuBKACIqECIACsBAAhogIBAKkEACGjAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhDgEAAJ0GACAQAACDBQAglAIBAAAAAZUCAQAAAAGWAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbQCAQAAAAG_AgEAAAABwAICAAAAAcECAgAAAAHCAiAAAAABAgAAALgCACAlAACnBwAgAwAAADIAICUAAKcHACAmAACrBwAgEAAAADIAIAEAAJwGACAQAAC5BAAgHgAAqwcAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACG_AgEAqQQAIcACAgC4BAAhwQICALgEACHCAiAArAQAIQ4BAACcBgAgEAAAuQQAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACG_AgEAqQQAIcACAgC4BAAhwQICALgEACHCAiAArAQAIRIMAADCBQAglAIBAAAAAZUCAQAAAAGWAgEAAAABlwIBAAAAAZgCAQAAAAGZAgEAAAABmwIAAACbAgKcAiAAAAABngIAAACeAgKgAgAAAKACAqECIAAAAAGiAgEAAAABowIBAAAAAaQCIAAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAECAAAA_wIAICUAAKwHACADAAAAggMAICUAAKwHACAmAACwBwAgFAAAAIIDACAMAACyBAAgHgAAsAcAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIZcCAQCqBAAhmAIBAKoEACGZAgEAqgQAIZsCAACrBJsCIpwCIACsBAAhngIAAK0EngIioAIAAK4EoAIioQIgAKwEACGiAgEAqQQAIaMCAQCpBAAhpAIgAKwEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACESDAAAsgQAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIZcCAQCqBAAhmAIBAKoEACGZAgEAqgQAIZsCAACrBJsCIpwCIACsBAAhngIAAK0EngIioAIAAK4EoAIioQIgAKwEACGiAgEAqQQAIaMCAQCpBAAhpAIgAKwEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACEMlAIBAAAAAZUCAQAAAAGWAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbQCAQAAAAG_AgEAAAAB5wIBAAAAAegCAQAAAAHpAoAAAAABDwEAAIoGACAIAAC_BQAglAIBAAAAAZUCAQAAAAGWAgEAAAABpAIgAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbQCAQAAAAG_AgEAAAAB0QIBAAAAAecCAQAAAAHoAgEAAAAB6QKAAAAAAQIAAAALACAlAACyBwAgAwAAAAMAICUAALIHACAmAAC2BwAgEQAAAAMAIAEAAIgGACAIAACKBQAgHgAAtgcAIJQCAQCpBAAhlQIBAKkEACGWAgEAqQQAIaQCIACsBAAhpQJAAK8EACGmAkAAsAQAIacCQACwBAAhtAIBAKoEACG_AgEAqQQAIdECAQCpBAAh5wIBAKoEACHoAgEAqgQAIekCgAAAAAEPAQAAiAYAIAgAAIoFACCUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhvwIBAKkEACHRAgEAqQQAIecCAQCqBAAh6AIBAKoEACHpAoAAAAABCpQCAQAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAG6AgEAAAAB8wIBAAAAAfQCAgAAAAH1AgIAAAAB9gICAAAAAfcCQAAAAAEJlAIBAAAAAaUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHOAgEAAAAB-AIBAAAAAfkCCAAAAAH6AgIAAAABCZQCAQAAAAGVAgEAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAc4CAQAAAAHPAgIAAAAB0AIIAAAAAQeUAgEAAAABlQIBAAAAAaUCQAAAAAGmAkAAAAABtQIgAAAAAc4CAQAAAAHwAkAAAAABCgYAAOIGACAVAACNBgAglAIBAAAAAZUCAQAAAAGlAkAAAAABpgJAAAAAAbUCIAAAAAHOAgEAAAAB7wIBAAAAAfACQAAAAAECAAAABwAgJQAAuwcAIAsOAAC8BgAglAIBAAAAAZUCAQAAAAGgAgAAAMcCAqUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHDAgIAAAABxAJAAAAAAcUCQAAAAAECAAAAnwIAICUAAL0HACALCQAA8QYAIJQCAQAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG1AiAAAAABzgIBAAAAAfgCAQAAAAH5AggAAAAB-gICAAAAAfsCAQAAAAECAAAAEwAgJQAAvwcAIA4BAACdBgAgDgAAhAUAIJQCAQAAAAGVAgEAAAABlgIBAAAAAaQCIAAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG0AgEAAAABvwIBAAAAAcACAgAAAAHBAgIAAAABwgIgAAAAAQIAAAC4AgAgJQAAwQcAIAMAAAAyACAlAADBBwAgJgAAxQcAIBAAAAAyACABAACcBgAgDgAAugQAIB4AAMUHACCUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhvwIBAKkEACHAAgIAuAQAIcECAgC4BAAhwgIgAKwEACEOAQAAnAYAIA4AALoEACCUAgEAqQQAIZUCAQCpBAAhlgIBAKkEACGkAiAArAQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbQCAQCqBAAhvwIBAKkEACHAAgIAuAQAIcECAgC4BAAhwgIgAKwEACEDlAIBAAAAAaACAAAA8gICuQIBAAAAAQgMAAC5BQAgEQAA_wQAIBcAAIAFACAYAACBBQAglAIBAAAAAaACAAAA8gICuQIBAAAAAe4CAQAAAAECAAAAIgAgJQAAxwcAIAMAAAAgACAlAADHBwAgJgAAywcAIAoAAAAgACAMAAC3BQAgEQAA1gQAIBcAANcEACAYAADYBAAgHgAAywcAIJQCAQCpBAAhoAIAANQE8gIiuQIBAKkEACHuAgEAqQQAIQgMAAC3BQAgEQAA1gQAIBcAANcEACAYAADYBAAglAIBAKkEACGgAgAA1ATyAiK5AgEAqQQAIe4CAQCpBAAhC5QCAQAAAAGgAgAAAM0CAqUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHIAgEAAAAByQIIAAAAAcoCAQAAAAHLAggAAAABzQJAAAAAAQMAAACiAgAgJQAAvQcAICYAAM8HACANAAAAogIAIA4AAKgGACAeAADPBwAglAIBAKkEACGVAgEAqQQAIaACAACmBscCIqUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhwwICAJYFACHEAkAAsAQAIcUCQACwBAAhCw4AAKgGACCUAgEAqQQAIZUCAQCpBAAhoAIAAKYGxwIipQJAAK8EACGmAkAAsAQAIacCQACwBAAhtQIgAKwEACHDAgIAlgUAIcQCQACwBAAhxQJAALAEACEDAAAAEQAgJQAAvwcAICYAANIHACANAAAAEQAgCQAA8AYAIB4AANIHACCUAgEAqQQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhzgIBAKkEACH4AgEAqQQAIfkCCADFBAAh-gICAJYFACH7AgEAqQQAIQsJAADwBgAglAIBAKkEACGlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIc4CAQCpBAAh-AIBAKkEACH5AggAxQQAIfoCAgCWBQAh-wIBAKkEACEKlAIBAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAboCAQAAAAHyAgEAAAAB9AICAAAAAfUCAgAAAAH2AgIAAAAB9wJAAAAAAQMAAAAFACAlAAC7BwAgJgAA1gcAIAwAAAAFACAGAADhBgAgFQAA1QUAIB4AANYHACCUAgEAqQQAIZUCAQCpBAAhpQJAAK8EACGmAkAAsAQAIbUCIACsBAAhzgIBAKkEACHvAgEAqQQAIfACQACwBAAhCgYAAOEGACAVAADVBQAglAIBAKkEACGVAgEAqQQAIaUCQACvBAAhpgJAALAEACG1AiAArAQAIc4CAQCpBAAh7wIBAKkEACHwAkAAsAQAIQ8KAAC7BQAgDQAAvAUAIA8AAPgFACASAAC-BQAglAIBAAAAAaYCQAAAAAGnAkAAAAABtQIgAAAAAboCAQAAAAHyAgEAAAAB8wIBAAAAAfQCAgAAAAH1AgIAAAAB9gICAAAAAfcCQAAAAAECAAAAFwAgJQAA1wcAIAiUAgEAAAABoAIAAAD-AgKlAkAAAAABpgJAAAAAAacCQAAAAAG1AiAAAAAB_AJAAAAAAf4CAQAAAAEKEQAA2wYAIJQCAQAAAAGlAkAAAAABpgJAAAAAAacCQAAAAAG1AiAAAAAB6wIAAADrAgLsAggAAAAB7QJAAAAAAe4CAQAAAAECAAAArQEAICUAANoHACADAAAAJAAgJQAA2gcAICYAAN4HACAMAAAAJAAgEQAA2gYAIB4AAN4HACCUAgEAqQQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAh6wIAAKEF6wIi7AIIAMUEACHtAkAAsAQAIe4CAQCpBAAhChEAANoGACCUAgEAqQQAIaUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAh6wIAAKEF6wIi7AIIAMUEACHtAkAAsAQAIe4CAQCpBAAhC5QCAQAAAAGgAgAAAM0CAqUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHHAgEAAAAByQIIAAAAAcoCAQAAAAHLAggAAAABzQJAAAAAAQMAAAAVACAlAADXBwAgJgAA4gcAIBEAAAAVACAKAACYBQAgDQAAmQUAIA8AAPYFACASAACbBQAgHgAA4gcAIJQCAQCpBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhugIBAKkEACHyAgEAqQQAIfMCAQCpBAAh9AICAJYFACH1AgIAlgUAIfYCAgCWBQAh9wJAAK8EACEPCgAAmAUAIA0AAJkFACAPAAD2BQAgEgAAmwUAIJQCAQCpBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhugIBAKkEACHyAgEAqQQAIfMCAQCpBAAh9AICAJYFACH1AgIAlgUAIfYCAgCWBQAh9wJAAK8EACEDlAIBAAAAAaACAAAA8gIC7gIBAAAAAQsLAAC7BgAglAIBAAAAAZUCAQAAAAGgAgAAAMcCAqUCQAAAAAGmAkAAAAABpwJAAAAAAbUCIAAAAAHDAgIAAAABxAJAAAAAAcUCQAAAAAECAAAAnwIAICUAAOQHACADAAAAogIAICUAAOQHACAmAADoBwAgDQAAAKICACALAACnBgAgHgAA6AcAIJQCAQCpBAAhlQIBAKkEACGgAgAApgbHAiKlAkAArwQAIaYCQACwBAAhpwJAALAEACG1AiAArAQAIcMCAgCWBQAhxAJAALAEACHFAkAAsAQAIQsLAACnBgAglAIBAKkEACGVAgEAqQQAIaACAACmBscCIqUCQACvBAAhpgJAALAEACGnAkAAsAQAIbUCIACsBAAhwwICAJYFACHEAkAAsAQAIcUCQACwBAAhCpQCAQAAAAGkAiAAAAABpQJAAAAAAaYCQAAAAAGnAkAAAAABugIBAAAAAbsCCAAAAAG8AggAAAABvQIIAAAAAb4CCAAAAAEBEAACBgUAGQwAAxEACxM9EBc5GBg8AQQBAAQFABcONQ0QNAICDDMDFgQFBAEABAUAFggABgswCwQFABUGAAcHDAUVEAkCBAgGBQAIAQQJAAMFABQIAAYUFAoDBQATCQAJCxgLBgUAEgoACg0ADA8ABRAjAhIlDwMFAA4LGQsOHQ0CDAADDQAMAgseAA4fAAMFABERAAsTKRACEAACEgAPARMqAAEQKwABCywAARQtAAIHLgAVLwABCzEAAg43ABA2AAEQAAICEz8AGD4AAAEQAAIBEAACAwUAHisAHywAIAAAAAMFAB4rAB8sACABCQAJAQkACQUFACUrACgsACk9ACY-ACcAAAAAAAUFACUrACgsACk9ACY-ACcDCgAKDQAMDwAFAwoACg0ADA8ABQUFAC4rADEsADI9AC8-ADAAAAAAAAUFAC4rADEsADI9AC8-ADACDAADEQALAgwAAxEACwMFADcrADgsADkAAAADBQA3KwA4LAA5AQYABwEGAAcDBQA-KwA_LABAAAAAAwUAPisAPywAQAERAAsBEQALBQUARSsASCwAST0ARj4ARwAAAAAABQUARSsASCwAST0ARj4ARwIBAAQIAAYCAQAECAAGAwUATisATywAUAAAAAMFAE4rAE8sAFABEAACARAAAgUFAFUrAFgsAFk9AFY-AFcAAAAAAAUFAFUrAFgsAFk9AFY-AFcBCAAGAQgABgUFAF4rAGEsAGI9AF8-AGAAAAAAAAUFAF4rAGEsAGI9AF8-AGACEAACEgAPAhAAAhIADwUFAGcrAGosAGs9AGg-AGkAAAAAAAUFAGcrAGosAGs9AGg-AGkAAAUFAHArAHMsAHQ9AHE-AHIAAAAAAAUFAHArAHMsAHQ9AHE-AHIBAQAEAQEABAUFAHkrAHwsAH09AHo-AHsAAAAAAAUFAHkrAHwsAH09AHo-AHsCDAADDQAMAgwAAw0ADAUFAIIBKwCFASwAhgE9AIMBPgCEAQAAAAAABQUAggErAIUBLACGAT0AgwE-AIQBAAADBQCLASsAjAEsAI0BAAAAAwUAiwErAIwBLACNAQAAAwUAkgErAJMBLACUAQAAAAMFAJIBKwCTASwAlAEZAgEaQAEbQQEcQgEdQwEfRQEgRxohSBsiSgEjTBokTRwnTgEoTwEpUBotUx0uVCEvVQowVgoxVwoyWAozWQo0Wwo1XRo2XiI3YAo4Yho5YyM6ZAo7ZQo8Zho_aSRAaipBawtCbAtDbQtEbgtFbwtGcQtHcxpIdCtJdgtKeBpLeSxMegtNewtOfBpPfy1QgAEzUYEBAlKCAQJTgwECVIQBAlWFAQJWhwECV4kBGliKATRZjAECWo4BGluPATVckAECXZEBAl6SARpflQE2YJYBOmGXAQZimAEGY5kBBmSaAQZlmwEGZp0BBmefARpooAE7aaIBBmqkARprpQE8bKYBBm2nAQZuqAEab6sBPXCsAUFxrgEPcq8BD3OxAQ90sgEPdbMBD3a1AQ93twEaeLgBQnm6AQ96vAEae70BQ3y-AQ99vwEPfsABGn_DAUSAAcQBSoEBxQEFggHGAQWDAccBBYQByAEFhQHJAQWGAcsBBYcBzQEaiAHOAUuJAdABBYoB0gEaiwHTAUyMAdQBBY0B1QEFjgHWARqPAdkBTZAB2gFRkQHcARiSAd0BGJMB3wEYlAHgARiVAeEBGJYB4wEYlwHlARqYAeYBUpkB6AEYmgHqARqbAesBU5wB7AEYnQHtARieAe4BGp8B8QFUoAHyAVqhAfMBCaIB9AEJowH1AQmkAfYBCaUB9wEJpgH5AQmnAfsBGqgB_AFbqQH-AQmqAYACGqsBgQJcrAGCAgmtAYMCCa4BhAIarwGHAl2wAYgCY7EBiQIQsgGKAhCzAYsCELQBjAIQtQGNAhC2AY8CELcBkQIauAGSAmS5AZQCELoBlgIauwGXAmW8AZgCEL0BmQIQvgGaAhq_AZ0CZsABngJswQGgAgzCAaECDMMBpAIMxAGlAgzFAaYCDMYBqAIMxwGqAhrIAasCbckBrQIMygGvAhrLAbACbswBsQIMzQGyAgzOAbMCGs8BtgJv0AG3AnXRAbkCA9IBugID0wG8AgPUAb0CA9UBvgID1gHAAgPXAcICGtgBwwJ22QHFAgPaAccCGtsByAJ33AHJAgPdAcoCA94BywIa3wHOAnjgAc8CfuEB0AIN4gHRAg3jAdICDeQB0wIN5QHUAg3mAdYCDecB2AIa6AHZAn_pAdsCDeoB3QIa6wHeAoAB7AHfAg3tAeACDe4B4QIa7wHkAoEB8AHlAocB8QHnAgfyAegCB_MB6wIH9AHsAgf1Ae0CB_YB7wIH9wHxAhr4AfICiAH5AfQCB_oB9gIa-wH3AokB_AH4Agf9AfkCB_4B-gIa_wH9AooBgAL-Ao4BgQKAAwSCAoEDBIMChAMEhAKFAwSFAoYDBIYCiAMEhwKKAxqIAosDjwGJAo0DBIoCjwMaiwKQA5ABjAKRAwSNApIDBI4CkwMajwKWA5EBkAKXA5UB"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AttendanceScalarFieldEnum: () => AttendanceScalarFieldEnum,
  CourseOfferingScalarFieldEnum: () => CourseOfferingScalarFieldEnum,
  CourseRegistrationScalarFieldEnum: () => CourseRegistrationScalarFieldEnum,
  CourseScalarFieldEnum: () => CourseScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DepartmentScalarFieldEnum: () => DepartmentScalarFieldEnum,
  ExamScalarFieldEnum: () => ExamScalarFieldEnum,
  InstructorScalarFieldEnum: () => InstructorScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProgramScalarFieldEnum: () => ProgramScalarFieldEnum,
  QueryMode: () => QueryMode,
  ResultScalarFieldEnum: () => ResultScalarFieldEnum,
  SemesterScalarFieldEnum: () => SemesterScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  StudentScalarFieldEnum: () => StudentScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TranscriptScalarFieldEnum: () => TranscriptScalarFieldEnum,
  UniversityScalarFieldEnum: () => UniversityScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.0",
  engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Attendance: "Attendance",
  Course: "Course",
  CourseOffering: "CourseOffering",
  CourseRegistration: "CourseRegistration",
  Department: "Department",
  Exam: "Exam",
  Instructor: "Instructor",
  Payment: "Payment",
  Program: "Program",
  Result: "Result",
  Semester: "Semester",
  Student: "Student",
  Transcript: "Transcript",
  University: "University",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AttendanceScalarFieldEnum = {
  id: "id",
  courseRegistrationId: "courseRegistrationId",
  classDate: "classDate",
  status: "status",
  remarks: "remarks",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CourseScalarFieldEnum = {
  id: "id",
  title: "title",
  code: "code",
  credit: "credit",
  semesterNo: "semesterNo",
  programId: "programId",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CourseOfferingScalarFieldEnum = {
  id: "id",
  courseId: "courseId",
  semesterId: "semesterId",
  instructorId: "instructorId",
  courseFee: "courseFee",
  totalSeat: "totalSeat",
  availableSeat: "availableSeat",
  isDelete: "isDelete",
  deleteAt: "deleteAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CourseRegistrationScalarFieldEnum = {
  id: "id",
  status: "status",
  studentId: "studentId",
  courseOfferingId: "courseOfferingId"
};
var DepartmentScalarFieldEnum = {
  id: "id",
  name: "name",
  code: "code",
  universityId: "universityId",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updateAt: "updateAt"
};
var ExamScalarFieldEnum = {
  id: "id",
  type: "type",
  toalMarks: "toalMarks",
  examDate: "examDate",
  courseOfferingId: "courseOfferingId",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var InstructorScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  address: "address",
  resume: "resume",
  resumePublicId: "resumePublicId",
  additionalFiles: "additionalFiles",
  userId: "userId",
  departmentId: "departmentId",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  status: "status",
  amount: "amount",
  currency: "currency",
  paymentGetway: "paymentGetway",
  merchantInvoiceNumber: "merchantInvoiceNumber",
  bkashPaymentId: "bkashPaymentId",
  bkashTrxId: "bkashTrxId",
  payerReference: "payerReference",
  paidAt: "paidAt",
  gatewayResponse: "gatewayResponse",
  refundTrxId: "refundTrxId",
  refundAmount: "refundAmount",
  refundReason: "refundReason",
  refundedAt: "refundedAt",
  courseRegistationId: "courseRegistationId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProgramScalarFieldEnum = {
  id: "id",
  name: "name",
  code: "code",
  duration: "duration",
  totalCredits: "totalCredits",
  departmentId: "departmentId",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ResultScalarFieldEnum = {
  id: "id",
  examId: "examId",
  courseRegistrationId: "courseRegistrationId",
  marks: "marks",
  grade: "grade",
  gradePoint: "gradePoint",
  status: "status",
  publishedAt: "publishedAt",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SemesterScalarFieldEnum = {
  id: "id",
  name: "name",
  year: "year",
  startDate: "startDate",
  endDate: "endDate",
  status: "status",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var StudentScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  address: "address",
  userId: "userId",
  admistionYear: "admistionYear",
  currentSemester: "currentSemester",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TranscriptScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  semesterId: "semesterId",
  totalCredit: "totalCredit",
  earnedCredit: "earnedCredit",
  gpa: "gpa",
  cgpa: "cgpa",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UniversityScalarFieldEnum = {
  id: "id",
  name: "name",
  shortName: "shortName",
  address: "address",
  email: "email",
  phone: "phone",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  phone: "phone",
  password: "password",
  googleId: "googleId",
  authProvider: "authProvider",
  emailVerified: "emailVerified",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  imageUrl: "imageUrl",
  imagePublicId: "imagePublicId",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};
var AuthProvider = {
  GOOGLE: "GOOGLE",
  CREDENTIAL: "CREDENTIAL"
};
var RegistrationStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED"
};
var PaymentStatus = {
  UNPAID: "UNPAID",
  PAID: "PAID",
  FAILED: "FAILED",
  CANCELED: "CANCELED",
  REFUNDED: "REFUNDED"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/utils/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = async (err, _req, res, _next) => {
  if (config_default.node_env === "development") {
    console.log("Error from Global Error Handler", err);
  }
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  const errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof AppError) {
    errorMessage = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: config_default.node_env === "development" ? errorName : "Internal Server Error",
    message: config_default.node_env === "development" ? errorMessage : "Internal Server Error",
    error: config_default.node_env === "development" ? err : void 0,
    stack: config_default.node_env === "development" ? err.stack : void 0
  });
};

// src/app/middleware/notFound.ts
import httpStatus2 from "http-status";
var notFound = (req, res) => {
  res.status(httpStatus2.NOT_FOUND).json({
    message: "Route Not Found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/app/module/admin/admin.route.ts
import { Router } from "express";

// src/app/lib/multer.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({ storage });

// src/app/middleware/checkAuth.ts
import httpStatus3 from "http-status";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, {
    expiresIn
  });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/app/middleware/checkAuth.ts
var auth = (...requestedRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus3.UNAUTHORIZED,
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new AppError(httpStatus3.UNAUTHORIZED, verifiedToken.error);
    }
    const { email, name, userId, role } = verifiedToken.data;
    if (requestedRoles.length && !requestedRoles.includes(role)) {
      throw new AppError(
        httpStatus3.FORBIDDEN,
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new AppError(
        httpStatus3.NOT_FOUND,
        "User not found. Please log in again."
      );
    }
    if (user.status === UserStatus.BLOCKED) {
      throw new AppError(
        httpStatus3.FORBIDDEN,
        "Your account has been blocked. Please contact support."
      );
    }
    req.user = {
      email,
      name,
      userId,
      role
    };
    next();
  });
};

// src/app/middleware/validateRequest.ts
import httpStatus4 from "http-status";
var validateRequest = (zodSchema) => {
  return catchAsync((req, res, next) => {
    const payload = req.body ?? {};
    const result = zodSchema.safeParse(payload);
    if (!result.success) {
      console.log(result.error.issues);
      throw new AppError(
        httpStatus4.BAD_REQUEST,
        result.error.issues[0].message
      );
    }
    req.body = result.data;
    next();
  });
};

// src/app/module/admin/admin.controller.ts
import httpStatus6 from "http-status";

// src/app/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/app/module/admin/admin.service.ts
import bcrypt from "bcryptjs";
import httpStatus5 from "http-status";

// src/app/lib/cloudinary.ts
import { v2 as Cloudinary } from "cloudinary";
Cloudinary.config({
  cloud_name: config_default.cloudinary_cloud_name,
  api_key: config_default.cloudinary_api_key,
  api_secret: config_default.cloudinary_api_secret
});
var cloudinary = Cloudinary;

// src/app/module/admin/admin.service.ts
var createUniversity = async (payload) => {
  const { name, shortName } = payload;
  const university = await prisma.university.create({
    data: {
      name,
      shortName
    }
  });
  return university;
};
var createDepartment = async (payload) => {
  const { name, code, universityId } = payload;
  const department = await prisma.department.create({
    data: {
      name,
      code,
      universityId
    },
    include: {
      university: true
    }
  });
  return department;
};
var createProgram = async (payload) => {
  const { name, code, duration, totalCredits, departmentId } = payload;
  const program = await prisma.program.create({
    data: {
      name,
      code,
      duration,
      totalCredits,
      departmentId
    },
    include: { department: true }
  });
  return program;
};
var createInstructor = async (payload, resume, additionalFiles) => {
  const isUserExisting = await prisma.user.findUnique({
    where: { email: payload.user.email }
  });
  if (isUserExisting) {
    throw new AppError(
      httpStatus5.CONFLICT,
      "User Already Existis With This Email"
    );
  }
  const resumeUploadResult = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error("No Result Return From Cloudinary"));
        }
        resolve(result);
      }).end(resume?.buffer);
    }
  );
  const additionalFilesUploadResults = await Promise.all(
    additionalFiles.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "auto" }, async (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("No Result Return From Cloudinary"));
          }
          resolve(result);
        }).end(file?.buffer);
      });
    })
  );
  const hashedPassword = await bcrypt.hash(
    payload.user.password,
    Number(config_default.bcrypt_salt_rounds)
  );
  const instructor = await prisma.user.create({
    data: {
      name: payload.user.name,
      email: payload.user.email,
      password: hashedPassword,
      needPasswordChange: true,
      emailVerified: true,
      role: Role.INSTRUCTOR,
      instuctor: {
        create: {
          name: payload.user.name,
          email: payload.user.email,
          departmentId: payload.instructor.departmentId,
          address: payload.instructor.address,
          resume: resumeUploadResult.secure_url,
          resumePublicId: resumeUploadResult.public_id,
          additionalFiles: additionalFilesUploadResults.map((file) => ({
            url: file.secure_url,
            publicId: file.public_id
          }))
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      instuctor: {
        include: {
          department: true
        }
      }
    }
  });
  return instructor;
};
var createCourse = async (payload) => {
  const { title, code, credit, semesterNo, programId } = payload;
  const course = prisma.course.create({
    data: {
      title,
      code,
      credit,
      semesterNo,
      programId
    },
    include: {
      program: true
    }
  });
  return course;
};
var createSemester = async (payload) => {
  const { name, year, startDate, endDate } = payload;
  const semester = prisma.semester.create({
    data: {
      name,
      year,
      startDate,
      endDate
    }
  });
  return semester;
};
var createCourseOffering = async (payload) => {
  const { courseId, semesterId, instructorId, courseFee, totalSeat } = payload;
  const semester = prisma.courseOffering.create({
    data: {
      courseId,
      semesterId,
      instructorId,
      courseFee,
      totalSeat,
      availableSeat: totalSeat
    }
  });
  return semester;
};
var AdminService = {
  createUniversity,
  createDepartment,
  createProgram,
  createInstructor,
  createCourse,
  createSemester,
  createCourseOffering
};

// src/app/module/admin/admin.validation.ts
import z from "zod";
var UniversityCreateZodSchema = z.object({
  name: z.string().trim().min(2),
  shortName: z.string().min(2).max(10)
});
var DepartmentCreateZodSchema = z.object({
  name: z.string().trim().min(2),
  code: z.string().min(2).max(10),
  universityId: z.string()
});
var ProgramCreateZodSchema = z.object({
  name: z.string().trim().min(2),
  code: z.string().min(2).max(10),
  duration: z.number().int().min(1).max(4, "Duration Maximum 4 Years"),
  totalCredits: z.number().int().min(1).max(160),
  departmentId: z.string("Not a string...")
});
var InstructorCreateZodSchema = z.object({
  user: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password cannot exceed 32 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
  }),
  instructor: z.object({
    address: z.string().trim().min(5, "Address must be at least 5 characters long").optional(),
    departmentId: z.string().trim().min(2)
  })
});
var CourseCreateZodSchema = z.object({
  title: z.string().trim().min(2),
  code: z.string().min(2).max(10),
  credit: z.number("Not a Number...").int().min(1).max(3),
  semesterNo: z.number("Not a Number...").int().min(1).max(12),
  programId: z.string()
});
var SemesterCreateZodSchema = z.object({
  name: z.string().trim().min(2),
  year: z.coerce.number("Year must be a number").int("Year must be an integer"),
  startDate: z.coerce.date("Start date must be a valid date"),
  endDate: z.coerce.date("End date must be a valid date")
});
var CourseOfferingCreateZodSchema = z.object({
  courseId: z.string().trim(),
  semesterId: z.string().trim(),
  instructorId: z.string().trim(),
  courseFee: z.number("Not a Number...").int().min(1),
  totalSeat: z.number("Not a Number...").int().min(1)
});
var AdminValidation = {
  UniversityCreateZodSchema,
  DepartmentCreateZodSchema,
  ProgramCreateZodSchema,
  InstructorCreateZodSchema,
  CourseCreateZodSchema,
  SemesterCreateZodSchema,
  CourseOfferingCreateZodSchema
};

// src/app/module/admin/admin.controller.ts
var createUniversity2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createUniversity(payload);
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "University Created successfully",
    data: result
  });
});
var createDepartment2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createDepartment(payload);
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Department Created successfully",
    data: result
  });
});
var createProgram2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createProgram(payload);
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Program Created successfully",
    data: result
  });
});
var createInstructor2 = catchAsync(async (req, res) => {
  const files = req.files;
  const resume = files?.["resume"] ? files["resume"][0] : null;
  const additionalFiles = files?.["additionalFiles"] || [];
  const zodValidationResult = AdminValidation.InstructorCreateZodSchema.safeParse(
    JSON.parse(req.body.data)
  );
  if (!zodValidationResult.success) {
    throw new Error(zodValidationResult.error.issues[0].message);
  }
  const payload = zodValidationResult.data;
  const result = await AdminService.createInstructor(
    payload,
    resume,
    additionalFiles
  );
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Instructor Created successfully",
    data: result
  });
});
var createCourse2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createCourse(payload);
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Course Created successfully",
    data: result
  });
});
var createSemester2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createSemester(payload);
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Semester Created successfully",
    data: result
  });
});
var createCourseOffering2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createCourseOffering(payload);
  sendResponse(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Course Offering Created successfully",
    data: result
  });
});
var AdminController = {
  createUniversity: createUniversity2,
  createDepartment: createDepartment2,
  createProgram: createProgram2,
  createInstructor: createInstructor2,
  createCourse: createCourse2,
  createSemester: createSemester2,
  createCourseOffering: createCourseOffering2
};

// src/app/module/admin/admin.route.ts
var router = Router();
router.post(
  "/university",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AdminValidation.UniversityCreateZodSchema),
  AdminController.createUniversity
);
router.post(
  "/department",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AdminValidation.DepartmentCreateZodSchema),
  AdminController.createDepartment
);
router.post(
  "/program",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AdminValidation.ProgramCreateZodSchema),
  AdminController.createProgram
);
router.post(
  "/instructor",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  upload.fields([
    {
      name: "resume",
      maxCount: 1
    },
    {
      name: "additionalFiles",
      maxCount: 10
    }
  ]),
  AdminController.createInstructor
);
router.post(
  "/course",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AdminValidation.CourseCreateZodSchema),
  AdminController.createCourse
);
router.post(
  "/semester",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AdminValidation.SemesterCreateZodSchema),
  AdminController.createSemester
);
router.post(
  "/course-offering",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AdminValidation.CourseOfferingCreateZodSchema),
  AdminController.createCourseOffering
);
var AdminRoutes = router;

// src/app/module/attendance/attendance.route.ts
import { Router as Router2 } from "express";

// src/app/module/attendance/attendance.controller.ts
import httpStatus7 from "http-status";

// src/app/module/attendance/attendance.service.ts
var createAttendance = async (payload) => {
  const { courseRegistrationId, classDate, status } = payload;
  const attendance = prisma.attendance.create({
    data: {
      courseRegistrationId,
      classDate,
      status
    },
    include: {
      courseRegistration: {
        include: {
          student: true
        }
      }
    }
  });
  return attendance;
};
var AttendanceService = {
  createAttendance
};

// src/app/module/attendance/attendance.controller.ts
var createAttendance2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AttendanceService.createAttendance(payload);
  sendResponse(res, {
    statusCode: httpStatus7.OK,
    success: true,
    message: "Attendance Created successfully",
    data: result
  });
});
var AttendanceController = {
  createAttendance: createAttendance2
};

// src/app/module/attendance/attendance.validation.ts
import z2 from "zod";
var AttendanceCreateZodSchema = z2.object({
  courseRegistrationId: z2.string().trim(),
  classDate: z2.coerce.date("Start date must be a valid date"),
  status: z2.string().trim()
});
var AttendanceValidation = {
  AttendanceCreateZodSchema
};

// src/app/module/attendance/attendance.route.ts
var router2 = Router2();
router2.post(
  "/",
  auth(Role.INSTRUCTOR, Role.ADMIN),
  validateRequest(AttendanceValidation.AttendanceCreateZodSchema),
  AttendanceController.createAttendance
);
var AttendanceRoutes = router2;

// src/app/module/auth/auth.route.ts
import { Router as Router3 } from "express";

// src/app/module/auth/auth.controller.ts
import httpStatus9 from "http-status";

// src/app/module/auth/auth.service.ts
import bcrypt2 from "bcryptjs";
import crypto from "crypto";
import ejs from "ejs";
import httpStatus8 from "http-status";
import path3 from "path";

// src/app/lib/googleAuth.ts
import { OAuth2Client } from "google-auth-library";
var googleClient = new OAuth2Client({
  client_id: config_default.google_client_id
});

// src/app/lib/nodemailer.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config_default.smtp_user,
    pass: config_default.smtp_password
  }
});

// src/app/lib/redis.ts
import { createClient } from "redis";
var redisClient = createClient({
  username: config_default.redis_user,
  password: config_default.redis_password,
  socket: {
    host: config_default.redis_host,
    port: Number(config_default.redis_port)
  }
});

// src/app/module/auth/auth.service.ts
var registerStudent = async (payload) => {
  const { name, password, student: studentData } = payload;
  const email = payload.email.trim().toLowerCase();
  const isUserExisting = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExisting) {
    throw new AppError(
      httpStatus8.CONFLICT,
      "User with this email already exists"
    );
  }
  const hashPassword = await bcrypt2.hash(
    password,
    Number(config_default.bcrypt_salt_rounds)
  );
  const expirationSecoends = 5 * 60;
  const otpKey = `student-registration-otp:${email}`;
  const otpValue = crypto.randomInt(1e5, 1e6).toString();
  await redisClient.set(otpKey, otpValue, {
    expiration: {
      type: "EX",
      value: expirationSecoends
    }
  });
  const studentRegistrationKey = `student-registration-data:${email}`;
  const redisUserDataPayload = {
    name,
    email,
    password: hashPassword,
    stusent: studentData
  };
  await redisClient.set(
    studentRegistrationKey,
    JSON.stringify(redisUserDataPayload),
    {
      expiration: {
        type: "EX",
        value: expirationSecoends
      }
    }
  );
  const templatePath = path3.join(
    process.cwd(),
    "src/app/templates/registration-user-otp.ejs"
  );
  const templateData = {
    name,
    email,
    otp: otpValue,
    expirationMinutes: expirationSecoends / 60
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: config_default.smtp_sender,
    to: email,
    subject: "Email Verification",
    html
  });
};
var verifyStudentEmail = async (payload) => {
  const otp = payload.otp;
  const email = payload.email.trim().toLowerCase();
  const isUserExisting = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExisting?.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus8.FORBIDDEN, "User is Blocked");
  }
  if (isUserExisting?.emailVerified) {
    throw new AppError(httpStatus8.CONFLICT, "Email Already Veryfied");
  }
  if (isUserExisting?.isDeleted || isUserExisting?.status === UserStatus.DELETED) {
    throw new AppError(httpStatus8.NOT_FOUND, "User is Deleted");
  }
  const otpKey = `student-registration-otp:${email}`;
  const redisOtp = await redisClient.get(otpKey);
  if (!redisOtp) {
    throw new AppError(httpStatus8.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOtp !== otp) {
    throw new AppError(httpStatus8.BAD_REQUEST, "OTP Does Not Match");
  }
  await redisClient.del(otpKey);
  const studentRegistrationKey = `student-registration-data:${email}`;
  const redisStudentData = await redisClient.get(studentRegistrationKey);
  if (!redisStudentData) {
    throw new AppError(httpStatus8.NOT_FOUND, "Student Does not Exist");
  }
  const studentPayload = JSON.parse(redisStudentData);
  const createUser = await prisma.user.create({
    data: {
      name: studentPayload.name,
      email: studentPayload.email,
      password: studentPayload.password,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      student: {
        create: {
          name: studentPayload.name,
          email: studentPayload.email
        }
      }
    },
    omit: { password: true },
    include: { student: true }
  });
  await redisClient.del(studentRegistrationKey);
  const templatePath = path3.join(
    process.cwd(),
    "src/app/templates/student-welcome-email.ejs"
  );
  const templateData = {
    name: createUser.name
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: config_default.smtp_sender,
    to: email,
    subject: "Welcome to University Management System",
    html
  });
  const { student, ...user } = createUser;
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    user,
    student,
    accessToken,
    refreshToken: refreshToken3
  };
};
var loginUser = async (payload) => {
  const { password } = payload;
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(httpStatus8.NOT_FOUND, "User Not Found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus8.FORBIDDEN, "User Is Blocked");
  }
  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus8.NOT_FOUND, "User Is Deleted");
  }
  if (user.password === null && user.googleId !== null) {
    throw new AppError(
      httpStatus8.CONFLICT,
      "User Already Has Account Registered With Google. Try To Login With Google"
    );
  }
  const isPasswordMatched = await bcrypt2.compare(
    password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus8.UNAUTHORIZED, "Invalid Credentials");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var refreshToken = async (token) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    token,
    config_default.jwt_refresh_secret
  );
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(
      httpStatus8.UNAUTHORIZED,
      config_default.node_env === "development" ? verifiedRefreshToken.error : "Invalid refresh token"
    );
  }
  const data = verifiedRefreshToken.data;
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new AppError(httpStatus8.NOT_FOUND, "User is inactive or not found");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var googleLogin = async (payload) => {
  let googleIdTokenPayload = null;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: payload.idToken,
      audience: config_default.google_client_id
    });
    googleIdTokenPayload = ticket.getPayload();
  } catch (error) {
    console.log("Google ID Token Verification Failed", error);
    throw new AppError(
      httpStatus8.BAD_REQUEST,
      "Invalid Or Expired Google ID Token"
    );
  }
  if (!googleIdTokenPayload) {
    throw new AppError(
      httpStatus8.BAD_REQUEST,
      "Invalid Or Expired Google ID Token"
    );
  }
  if (!googleIdTokenPayload.email) {
    throw new AppError(httpStatus8.NOT_FOUND, "Google Email Not Found");
  }
  if (!googleIdTokenPayload.name) {
    throw new AppError(httpStatus8.NOT_FOUND, "Google Name Not Found");
  }
  const isStudentExistWithGoogleAuth = await prisma.user.findUnique({
    where: {
      email: googleIdTokenPayload.email,
      role: Role.STUDENT,
      googleId: googleIdTokenPayload.sub
    }
  });
  let user = isStudentExistWithGoogleAuth;
  if (!isStudentExistWithGoogleAuth) {
    const ifPatientExistWithCredentials = await prisma.user.findUnique({
      where: {
        email: googleIdTokenPayload.email,
        role: Role.STUDENT,
        authProvider: AuthProvider.CREDENTIAL
      }
    });
    if (ifPatientExistWithCredentials) {
      if (!ifPatientExistWithCredentials.emailVerified) {
        throw new AppError(httpStatus8.FORBIDDEN, "Email Not Verified");
      }
      if (ifPatientExistWithCredentials.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus8.FORBIDDEN, "User Is Blocked");
      }
      if (ifPatientExistWithCredentials.isDeleted || ifPatientExistWithCredentials.status === UserStatus.DELETED) {
        throw new AppError(httpStatus8.NOT_FOUND, "User Is Deleted");
      }
      user = await prisma.user.update({
        where: {
          id: ifPatientExistWithCredentials.id
        },
        data: {
          googleId: googleIdTokenPayload.sub
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: googleIdTokenPayload.name,
          email: googleIdTokenPayload.email,
          role: Role.STUDENT,
          googleId: googleIdTokenPayload.sub,
          authProvider: AuthProvider.GOOGLE,
          emailVerified: true,
          student: {
            create: {
              name: googleIdTokenPayload.name,
              email: googleIdTokenPayload.email
            }
          }
        }
      });
      const templatePath = path3.join(
        process.cwd(),
        "src/app/templates/student-welcome-email.ejs"
      );
      const templateData = {
        name: user.name
      };
      const html = await ejs.renderFile(templatePath, templateData);
      await transporter.sendMail({
        from: config_default.smtp_sender,
        to: user.email,
        subject: "Welcome to University Management System",
        html
      });
    }
  }
  if (!user) {
    throw new AppError(httpStatus8.NOT_FOUND, "User Not Found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus8.FORBIDDEN, "User Is Blocked");
  }
  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus8.NOT_FOUND, "User Is Deleted");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var AuthService = {
  registerStudent,
  verifyStudentEmail,
  loginUser,
  refreshToken,
  googleLogin
};

// src/app/module/auth/auth.controller.ts
var registerStudent2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.registerStudent(payload);
  sendResponse(res, {
    statusCode: httpStatus9.CREATED,
    success: true,
    message: "Verification OTP Sent",
    data: null
  });
});
var verifyStudentEmail2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.verifyStudentEmail(payload);
  const { accessToken, refreshToken: refreshToken3, user, student } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 day
  });
  sendResponse(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3,
      user,
      student
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 day
  });
  sendResponse(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var refreshToken2 = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(httpStatus9.NOT_FOUND, "Refresh Token is Missing");
  }
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 1 day
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken
    }
  });
});
var googleLogin2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.googleLogin(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 day
  });
  sendResponse(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var AuthController = {
  registerStudent: registerStudent2,
  verifyStudentEmail: verifyStudentEmail2,
  loginUser: loginUser2,
  refreshToken: refreshToken2,
  googleLogin: googleLogin2
};

// src/app/module/auth/auth.validation.ts
import z3 from "zod";
var StudentRegistrationZodSchema = z3.object({
  name: z3.string("Not a string....").min(3).max(10),
  email: z3.email("Not Email...."),
  password: z3.string().min(8, "Password must be at least 8 characters long").max(32, "Password cannot exceed 32 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  ),
  student: z3.object({ address: z3.string().optional() }).optional()
});
var StudentEmailVerifyZodSchema = z3.object({
  email: z3.email("Not Email...."),
  otp: z3.string().length(6)
});
var ForgotPassowedZodShema = z3.object({
  email: z3.email("Not Email....")
});
var ResetPassowedZodShema = z3.object({
  email: z3.email("Not Email...."),
  newPassword: z3.string().min(8, "Password must be at least 8 characters long").max(32, "Password cannot exceed 32 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  ),
  otp: z3.string().length(6)
});
var UserValidation = {
  StudentRegistrationZodSchema,
  StudentEmailVerifyZodSchema,
  ForgotPassowedZodShema,
  ResetPassowedZodShema
};

// src/app/module/auth/auth.route.ts
var router3 = Router3();
router3.post(
  "/register",
  validateRequest(UserValidation.StudentRegistrationZodSchema),
  AuthController.registerStudent
);
router3.post(
  "/verify-email",
  validateRequest(UserValidation.StudentEmailVerifyZodSchema),
  AuthController.verifyStudentEmail
);
router3.post("/login", AuthController.loginUser);
router3.post("/refresh-token", AuthController.refreshToken);
router3.post("/google", AuthController.googleLogin);
var AuthRoutes = router3;

// src/app/module/courseOffering/courseOffering.route.ts
import { Router as Router4 } from "express";

// src/app/module/courseOffering/courseOffering.controller.ts
import httpStatus11 from "http-status";

// src/app/module/courseOffering/courseOffering.service.ts
import httpStatus10 from "http-status";
var getAllCourseOffering = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.courseId) {
    andConditions.push({ courseId: query.courseId });
  }
  if (query.semesterId) {
    andConditions.push({ semesterId: query.semesterId });
  }
  if (query.instructorId) {
    andConditions.push({ instructorId: query.instructorId });
  }
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          instructor: {
            OR: [
              { name: { contains: query.searchTerm, mode: "insensitive" } },
              { email: { contains: query.searchTerm, mode: "insensitive" } }
            ]
          }
        },
        {
          course: {
            OR: [
              { title: { contains: query.searchTerm, mode: "insensitive" } },
              { code: { contains: query.searchTerm, mode: "insensitive" } }
            ]
          }
        },
        {
          semester: {
            OR: [{ name: { contains: query.searchTerm, mode: "insensitive" } }]
          }
        }
      ]
    });
  }
  const allCourseOffering = await prisma.courseOffering.findMany({
    where: { AND: andConditions },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      course: true,
      semester: true,
      instructor: {
        select: {
          name: true
        }
      }
    }
  });
  const total = await prisma.courseOffering.count({
    where: { AND: andConditions }
  });
  return {
    data: allCourseOffering,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var updateCourseOffering = async (payload, id) => {
  const existingCourse = await prisma.courseOffering.findUnique({
    where: { id }
  });
  if (!existingCourse) {
    throw new AppError(httpStatus10.NOT_FOUND, "Course Not Exists");
  }
  const bookedSeat = existingCourse.totalSeat - existingCourse.availableSeat;
  const totalSeat = payload.totalSeat ?? existingCourse.totalSeat;
  const availableSeat = totalSeat - bookedSeat;
  if (availableSeat < 0) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "Total seat cannot be less than booked seat"
    );
  }
  const updatedCourse = await prisma.courseOffering.update({
    where: { id },
    data: {
      ...payload,
      totalSeat,
      availableSeat
    }
  });
  return updatedCourse;
};
var deleteOfferingCourse = async (id) => {
  const existingCourse = await prisma.courseOffering.findUnique({
    where: { id }
  });
  if (!existingCourse) {
    throw new AppError(httpStatus10.NOT_FOUND, "Course Not Exists");
  }
  if (existingCourse.availableSeat < existingCourse.totalSeat) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "Cannot delete course. Becouse course has been registed student"
    );
  }
  const deletedCourse = await prisma.courseOffering.delete({
    where: { id }
  });
  return deletedCourse;
};
var CourseOfferingService = {
  getAllCourseOffering,
  updateCourseOffering,
  deleteOfferingCourse
};

// src/app/module/courseOffering/courseOffering.controller.ts
var getAllCourseOffering2 = catchAsync(async (req, res) => {
  const { data, meta } = await CourseOfferingService.getAllCourseOffering(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus11.OK,
    success: true,
    message: "Course Offering fetched successfully",
    data,
    meta
  });
});
var updateCourseOffering2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const result = await CourseOfferingService.updateCourseOffering(
    payload,
    id
  );
  sendResponse(res, {
    statusCode: httpStatus11.OK,
    success: true,
    message: "Course Offering Updated successfully",
    data: result
  });
});
var deletedCourseOffering = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await CourseOfferingService.deleteOfferingCourse(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus11.OK,
      success: true,
      message: "Course Offering Deleted successfully",
      data: result
    });
  }
);
var CourseOfferingController = {
  getAllCourseOffering: getAllCourseOffering2,
  updateCourseOffering: updateCourseOffering2,
  deletedCourseOffering
};

// src/app/module/courseOffering/courseOffering.route.ts
var router4 = Router4();
router4.get(
  "/",
  auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
  CourseOfferingController.getAllCourseOffering
);
router4.patch(
  "/:id",
  auth(Role.ADMIN),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  CourseOfferingController.updateCourseOffering
);
router4.delete(
  "/:id",
  auth(Role.ADMIN),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  CourseOfferingController.deletedCourseOffering
);
var CourseOfferingRoutes = router4;

// src/app/module/courseRegistration/courseRegistration.route.ts
import { Router as Router5 } from "express";

// src/app/module/courseRegistration/courseRegistration.controller.ts
import httpStatus14 from "http-status";

// src/app/module/courseRegistration/courseRegistration.service.ts
import { format } from "date-fns";
import httpStatus13 from "http-status";
import PDFDocument from "pdfkit";

// src/app/lib/bkash.ts
import httpStatus12 from "http-status";
var getBkashIdToken = async () => {
  try {
    const IdTokenKey = "bkash:idToken";
    const RefreshTokenKey = "bkash:refreshToken";
    let bkashIdToken = await redisClient.get(IdTokenKey);
    const bkashIdTokenTTL = await redisClient.ttl(IdTokenKey);
    const bkashRefreshToken = await redisClient.get(RefreshTokenKey);
    const bkashRefreshTokenTTL = await redisClient.ttl(RefreshTokenKey);
    if ((bkashIdTokenTTL <= 600 || !bkashIdToken) && bkashRefreshToken && bkashRefreshTokenTTL > 600) {
      const refreshTokenresponse = await fetch(
        `${config_default.bkash_base_url}/tokenized/checkout/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: " application/json",
            username: config_default.bkash_username,
            password: config_default.bkash_password
          },
          body: JSON.stringify({
            app_key: config_default.bkash_app_key,
            app_secret: config_default.bkash_app_secret,
            refresh_token: bkashRefreshToken
          })
        }
      );
      if (!refreshTokenresponse.ok) {
        throw new AppError(
          httpStatus12.BAD_GATEWAY,
          "bKash Access Token Grant Failed"
        );
      }
      const bkashRefreshTokenResult = await refreshTokenresponse.json();
      bkashIdToken = bkashRefreshTokenResult.id_token;
      await redisClient.set(IdTokenKey, bkashIdToken, {
        expiration: {
          type: "EX",
          value: 60 * 60
        }
      });
      return bkashIdToken;
    }
    if (bkashIdTokenTTL > 600) {
      return bkashIdToken;
    }
    const response = await fetch(
      `${config_default.bkash_base_url}/tokenized/checkout/token/grant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: " application/json",
          username: config_default.bkash_username,
          password: config_default.bkash_password
        },
        body: JSON.stringify({
          app_key: config_default.bkash_app_key,
          app_secret: config_default.bkash_app_secret
        })
      }
    );
    if (!response.ok) {
      throw new AppError(
        httpStatus12.BAD_GATEWAY,
        "bKash Access Token Grant Failed"
      );
    }
    const result = await response.json();
    await redisClient.set(IdTokenKey, result.id_token, {
      expiration: {
        type: "EX",
        value: 60 * 60
        // 1 hour
      }
    });
    await redisClient.set(RefreshTokenKey, result.refresh_token, {
      expiration: {
        type: "EX",
        value: 60 * 60 * 24 * 28
        // 28 days
      }
    });
    bkashIdToken = result.id_token;
    return bkashIdToken;
  } catch (error) {
    throw new AppError(httpStatus12.BAD_GATEWAY, error.message);
  }
};

// src/app/module/courseRegistration/courseRegistration.service.ts
var createCourseRegistration = async (payload, user) => {
  const transectionResult = await prisma.$transaction(async (tx) => {
    const student = await tx.student.findUnique({
      where: { userId: user.userId }
    });
    if (!student) {
      throw new AppError(httpStatus13.NOT_FOUND, "Student Profile Not Found");
    }
    const offeredCourse = await tx.courseOffering.findUnique({
      where: { id: payload.courseOfferingId }
    });
    if (!offeredCourse || offeredCourse.isDelete) {
      throw new AppError(httpStatus13.NOT_FOUND, "Course Not Found");
    }
    const existingCourseRegistration = await tx.courseRegistration.findFirst({
      where: {
        studentId: student.id,
        courseOfferingId: offeredCourse.id
      }
    });
    if (existingCourseRegistration?.status === RegistrationStatus.PENDING) {
      throw new AppError(
        httpStatus13.BAD_REQUEST,
        "Course Registration Pending. Please Pay For That To Confirm"
      );
    }
    if (existingCourseRegistration?.status === RegistrationStatus.CONFIRMED) {
      throw new AppError(
        httpStatus13.BAD_REQUEST,
        "Course Already Registred This Course"
      );
    }
    if (offeredCourse.availableSeat === 0) {
      throw new AppError(httpStatus13.BAD_REQUEST, "Seat Not Available");
    }
    if (!offeredCourse.courseFee) {
      throw new AppError(httpStatus13.BAD_REQUEST, "Course Fee Not Set Yet");
    }
    const registration = await tx.courseRegistration.create({
      data: {
        status: RegistrationStatus.PENDING,
        studentId: student.id,
        courseOfferingId: offeredCourse.id
      }
    });
    const bkashIdToken = await getBkashIdToken();
    if (!bkashIdToken) {
      throw new AppError(httpStatus13.BAD_GATEWAY, "No Bkash Access Token Found");
    }
    const bkashCreatePaymentResponse = await fetch(
      `${config_default.bkash_base_url}/tokenized/checkout/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: bkashIdToken,
          "X-App-Key": config_default.bkash_app_key
        },
        body: JSON.stringify({
          mode: "0011",
          // payerReference: "0123456789", //user email or phone number
          payerReference: user.email,
          //user email or phone number
          callbackURL: `${config_default.bkash_callback_url}/course-registration/payment/callback`,
          amount: offeredCourse.courseFee.toString(),
          currency: "BDT",
          intent: "sale",
          // merchantInvoiceNumber: "Inv4" // apppointment id
          merchantInvoiceNumber: registration.id
          // apppointment id
        })
      }
    );
    const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json();
    await tx.payment.create({
      data: {
        merchantInvoiceNumber: bkashCreatePaymentResult.merchantInvoiceNumber,
        courseRegistationId: registration.id,
        amount: offeredCourse.courseFee.toString(),
        gatewayResponse: bkashCreatePaymentResult,
        bkashPaymentId: bkashCreatePaymentResult.paymentID,
        payerReference: user.email
      }
    });
    return {
      paymentUrl: bkashCreatePaymentResult.bkashURL
    };
  });
  return transectionResult;
};
var courseRegistrationCallback = async (query) => {
  const transectionResult = await prisma.$transaction(
    async (tx) => {
      const paymentId = query.paymentID;
      if (!paymentId) {
        throw new AppError(httpStatus13.BAD_REQUEST, "Payment Id Missing");
      }
      const status = query.status;
      if (!status) {
        throw new AppError(httpStatus13.BAD_REQUEST, "Payment Status Is Missing");
      }
      const bkashIdToken = await getBkashIdToken();
      if (!bkashIdToken) {
        throw new AppError(
          httpStatus13.BAD_REQUEST,
          "No Bkash Access Token Found"
        );
      }
      const executedPaymentResponse = await fetch(
        `${config_default.bkash_base_url}/tokenized/checkout/execute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: bkashIdToken,
            "X-App-Key": config_default.bkash_app_key
          },
          body: JSON.stringify({
            paymentID: paymentId
          })
        }
      );
      const executedPaymentResult = await executedPaymentResponse.json();
      if (status === "success") {
        const resitation = await prisma.courseRegistration.findUnique({
          where: {
            id: executedPaymentResult.merchantInvoiceNumber
          },
          include: {
            student: true,
            courseOffering: {
              include: {
                course: {
                  include: {
                    program: {
                      include: {
                        department: {
                          include: {
                            university: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });
        if (!resitation) {
          throw new AppError(
            httpStatus13.NOT_FOUND,
            "Course Registration Not Found!"
          );
        }
        await tx.courseRegistration.update({
          where: { id: executedPaymentResult.merchantInvoiceNumber },
          data: {
            status: RegistrationStatus.CONFIRMED
          }
        });
        const newAvailableSeat = resitation.courseOffering.availableSeat - 1;
        await tx.courseOffering.update({
          where: {
            id: resitation.courseOffering.id
          },
          data: {
            availableSeat: newAvailableSeat
          }
        });
        await tx.payment.update({
          where: {
            courseRegistationId: executedPaymentResult.merchantInvoiceNumber,
            bkashPaymentId: paymentId
          },
          data: {
            status: PaymentStatus.PAID,
            bkashTrxId: executedPaymentResult.trxID,
            paidAt: executedPaymentResult.paymentExecuteTime,
            gatewayResponse: executedPaymentResult
          }
        });
        const pdfDocument = new PDFDocument({
          size: "A4",
          margin: 50
        });
        const pdfChunks = [];
        pdfDocument.on("data", (chunk) => {
          pdfChunks.push(chunk);
        });
        const pdfReadyPromise = new Promise((resolve, reject) => {
          pdfDocument.on("end", () => {
            resolve(Buffer.concat(pdfChunks));
          });
          pdfDocument.on("error", reject);
        });
        const drawLine = (y) => {
          pdfDocument.strokeColor("#D1D5DB").lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
        };
        const drawLabelValue = (label, value, y) => {
          pdfDocument.fontSize(10).fillColor("#6B7280").font("Helvetica").text(label, 55, y, {
            width: 150
          });
          pdfDocument.fontSize(10).fillColor("#111827").font("Helvetica-Bold").text(value || "N/A", 205, y, {
            width: 330
          });
        };
        pdfDocument.font("Helvetica-Bold").fontSize(20).fillColor("#111827").text("UNIVERSITY MANAGEMENT SYSTEM", {
          align: "center"
        });
        pdfDocument.moveDown(0.3).font("Helvetica").fontSize(10).fillColor("#6B7280").text("UMS | Academic & Payment Management", {
          align: "center"
        });
        pdfDocument.moveDown(1);
        drawLine(pdfDocument.y);
        pdfDocument.moveDown(1);
        pdfDocument.font("Helvetica-Bold").fontSize(22).fillColor("#111827").text("PAYMENT INVOICE", {
          align: "left"
        });
        pdfDocument.font("Helvetica").fontSize(9).fillColor("#6B7280").text("Official payment receipt", 50, pdfDocument.y + 5);
        pdfDocument.roundedRect(455, 145, 90, 28, 5).fillColor("#DCFCE7").fill();
        pdfDocument.font("Helvetica-Bold").fontSize(10).fillColor("#166534").text("PAID", 455, 154, {
          width: 90,
          align: "center"
        });
        pdfDocument.moveDown(2);
        const invoiceInfoY = pdfDocument.y;
        pdfDocument.font("Helvetica-Bold").fontSize(10).fillColor("#111827").text("INVOICE INFORMATION", 50, invoiceInfoY);
        drawLabelValue(
          "Transaction ID",
          executedPaymentResult.trxID,
          invoiceInfoY + 25
        );
        drawLabelValue("Payment Method", "bKash", invoiceInfoY + 43);
        drawLabelValue(
          "Payment Date",
          format(executedPaymentResult.paymentExecuteTime, "dd-MMM-yyyy"),
          invoiceInfoY + 61
        );
        const studentInfoY = invoiceInfoY + 105;
        pdfDocument.font("Helvetica-Bold").fontSize(10).fillColor("#111827").text("STUDENT INFORMATION", 50, studentInfoY);
        drawLabelValue(
          "Name",
          resitation.student?.name ?? "N/A",
          studentInfoY + 25
        );
        drawLabelValue(
          "Email",
          resitation.student?.email ?? "N/A",
          studentInfoY + 43
        );
        const universityName = resitation.courseOffering.course.program.department.university.name;
        const departmentName = resitation.courseOffering.course.program.department.name;
        const programName = resitation.courseOffering.course.program.name;
        const courseName = resitation.courseOffering.course.title;
        const academicInfoY = studentInfoY + 90;
        pdfDocument.font("Helvetica-Bold").fontSize(10).fillColor("#111827").text("ACADEMIC INFORMATION", 50, academicInfoY);
        drawLabelValue("University", universityName, academicInfoY + 25);
        drawLabelValue("Department", departmentName, academicInfoY + 43);
        drawLabelValue("Program", programName, academicInfoY + 61);
        drawLabelValue("Course", courseName, academicInfoY + 79);
        const summaryY = academicInfoY + 125;
        pdfDocument.font("Helvetica-Bold").fontSize(12).fillColor("#111827").text("PAYMENT SUMMARY", 50, summaryY);
        drawLine(summaryY + 22);
        pdfDocument.font("Helvetica-Bold").fontSize(10).fillColor("#6B7280").text("DESCRIPTION", 55, summaryY + 35);
        pdfDocument.text("AMOUNT", 430, summaryY + 35, {
          width: 100,
          align: "right"
        });
        drawLine(summaryY + 55);
        pdfDocument.font("Helvetica").fontSize(10).fillColor("#111827").text("Course / Academic Payment", 55, summaryY + 70);
        pdfDocument.text(
          `${executedPaymentResult.amount} BDT`,
          430,
          summaryY + 70,
          {
            width: 100,
            align: "right"
          }
        );
        drawLine(summaryY + 95);
        pdfDocument.font("Helvetica-Bold").fontSize(12).fillColor("#111827").text("TOTAL PAID", 55, summaryY + 112);
        pdfDocument.font("Helvetica-Bold").fontSize(14).fillColor("#111827").text(`${executedPaymentResult.amount} BDT`, 400, summaryY + 110, {
          width: 130,
          align: "right"
        });
        const confirmationY = summaryY + 160;
        pdfDocument.roundedRect(50, confirmationY, 495, 65, 6).fillColor("#F0FDF4").fill();
        pdfDocument.font("Helvetica-Bold").fontSize(10).fillColor("#166534").text("PAYMENT CONFIRMED", 65, confirmationY + 15);
        pdfDocument.font("Helvetica").fontSize(9).fillColor("#166534").text(
          "Your payment has been successfully processed through bKash.",
          65,
          confirmationY + 32
        );
        const footerY = 750;
        drawLine(footerY);
        pdfDocument.font("Helvetica").fontSize(8).fillColor("#6B7280").text(
          "This is a computer-generated invoice and does not require a signature.",
          50,
          footerY + 12,
          {
            align: "center",
            width: 495
          }
        );
        pdfDocument.fontSize(8).fillColor("#9CA3AF").text("University Management System (UMS)", 50, footerY + 27, {
          align: "center",
          width: 495
        });
        pdfDocument.end();
        const pdfBuffer = await pdfReadyPromise;
        await transporter.sendMail({
          from: config_default.smtp_sender,
          to: resitation.student.email,
          subject: "Your Cousere Registration Invoice - UMS",
          text: "Thank you for registration a course. Please find your invoice attached.",
          attachments: [
            {
              filename: "invoice.pdf",
              content: pdfBuffer
            }
          ]
        });
        return {
          redirectUrl: `${config_default.frontend_url}/dashboard/my-courses?status=success`
        };
      } else if (status === "failure") {
        await tx.payment.update({
          where: {
            bkashPaymentId: paymentId
          },
          data: {
            status: PaymentStatus.FAILED,
            gatewayResponse: executedPaymentResult
          }
        });
        return {
          redirectUrl: `${config_default.frontend_url}/dashboard/my-courses?status=failue`
        };
      } else if (status === "cancel") {
        await tx.payment.update({
          where: {
            bkashPaymentId: paymentId
          },
          data: {
            status: PaymentStatus.CANCELED,
            gatewayResponse: executedPaymentResult
          }
        });
        return {
          executedPaymentResult,
          redirectUrl: `${config_default.frontend_url}/dashboard/my-courses?status=cancel`
        };
      } else {
        return {
          executedPaymentResult,
          redirectUrl: `${config_default.frontend_url}/dashboard/my-courses?error=payment-failed`
        };
      }
    },
    {
      maxWait: 1e4,
      // default: 2000
      timeout: 3e4
      // default: 5000
    }
  );
  return transectionResult;
};
var payCourseRegistration = async (payload, user) => {
  const transectionResult = await prisma.$transaction(async (tx) => {
    const registationId = payload.courseRegistrationId;
    const existingRegistraion = await tx.courseRegistration.findUnique({
      where: { id: registationId },
      include: {
        courseOffering: true
      }
    });
    if (!existingRegistraion) {
      throw new AppError(httpStatus13.NOT_FOUND, "Course Registration Not Found");
    }
    if (existingRegistraion.status !== RegistrationStatus.PENDING) {
      throw new AppError(
        httpStatus13.BAD_REQUEST,
        "Course Registration Not Pending"
      );
    }
    const bkashIdToken = await getBkashIdToken();
    if (!bkashIdToken) {
      throw new AppError(httpStatus13.BAD_REQUEST, "No Bkash Access Token Found");
    }
    const bkashCreatePaymentResponse = await fetch(
      `${config_default.bkash_base_url}/tokenized/checkout/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: bkashIdToken,
          "X-App-Key": config_default.bkash_app_key
        },
        body: JSON.stringify({
          mode: "0011",
          // payerReference: "0123456789", //user email or phone number
          payerReference: user.email,
          //user email or phone number
          callbackURL: `${config_default.bkash_callback_url}/course-registration/payment/callback`,
          amount: existingRegistraion.courseOffering.courseFee.toString(),
          currency: "BDT",
          intent: "sale",
          // merchantInvoiceNumber: "Inv4" // apppointment id
          merchantInvoiceNumber: existingRegistraion.id
          // apppointment id
        })
      }
    );
    const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json();
    await tx.payment.update({
      where: {
        courseRegistationId: existingRegistraion.id
      },
      data: {
        merchantInvoiceNumber: bkashCreatePaymentResult.merchantInvoiceNumber,
        gatewayResponse: bkashCreatePaymentResult,
        bkashPaymentId: bkashCreatePaymentResult.paymentID
      }
    });
    return {
      paymentUrl: bkashCreatePaymentResult.bkashURL
    };
  });
  return transectionResult;
};
var CourseRegistrationService = {
  createCourseRegistration,
  payCourseRegistration,
  courseRegistrationCallback
};

// src/app/module/courseRegistration/courseRegistration.controller.ts
var createCourseRegistration2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const result = await CourseRegistrationService.createCourseRegistration(
      payload,
      user
    );
    sendResponse(res, {
      statusCode: httpStatus14.OK,
      success: true,
      message: "Course Registration Successfully",
      data: result
    });
  }
);
var payCourseRegistration2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const result = await CourseRegistrationService.payCourseRegistration(
      payload,
      user
    );
    sendResponse(res, {
      statusCode: httpStatus14.OK,
      success: true,
      message: "Course Registration Payment Successfully",
      data: result
    });
  }
);
var courseRegistrationCallback2 = catchAsync(
  async (req, res) => {
    const { redirectUrl } = await CourseRegistrationService.courseRegistrationCallback(req.query);
    res.redirect(redirectUrl);
  }
);
var CourseRegistrationController = {
  createCourseRegistration: createCourseRegistration2,
  payCourseRegistration: payCourseRegistration2,
  courseRegistrationCallback: courseRegistrationCallback2
};

// src/app/module/courseRegistration/courseRegistration.validation.ts
import z4 from "zod";
var CourseRegistationValidationZodSchema = z4.object({
  courseOfferingId: z4.string()
});
var PayCourseRegistationValidationZodSchema = z4.object({
  courseRegistrationId: z4.string()
});

// src/app/module/courseRegistration/courseRegistration.route.ts
var router5 = Router5();
router5.post(
  "/",
  auth(Role.STUDENT),
  validateRequest(CourseRegistationValidationZodSchema),
  CourseRegistrationController.createCourseRegistration
);
router5.post(
  "/payment",
  auth(Role.STUDENT),
  validateRequest(PayCourseRegistationValidationZodSchema),
  CourseRegistrationController.payCourseRegistration
);
router5.get(
  "/payment/callback",
  CourseRegistrationController.courseRegistrationCallback
);
var CourseRegistrationRoutes = router5;

// src/app/module/exam/exam.route.ts
import { Router as Router6 } from "express";

// src/app/module/exam/exam.controller.ts
import httpStatus16 from "http-status";

// src/app/module/exam/exam.service.ts
import httpStatus15 from "http-status";
var createExam = async (payload) => {
  const { type, examDate, toalMarks, courseOfferingId } = payload;
  const offeredCourse = await prisma.courseOffering.findFirst({
    where: {
      id: courseOfferingId
    }
  });
  if (!offeredCourse) {
    throw new AppError(httpStatus15.NOT_FOUND, "Course Not Found");
  }
  const exam = await prisma.exam.create({
    data: {
      type,
      examDate,
      toalMarks,
      courseOfferingId
    },
    include: {
      courseOffering: {
        include: {
          course: true
        }
      }
    }
  });
  return exam;
};
var ExamService = {
  createExam
};

// src/app/module/exam/exam.controller.ts
var createExam2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ExamService.createExam(payload);
  sendResponse(res, {
    statusCode: httpStatus16.OK,
    success: true,
    message: "Attendance Created successfully",
    data: result
  });
});
var ExamController = {
  createExam: createExam2
};

// src/app/module/exam/exam.validation.ts
import z5 from "zod";
var ExamCreateZodSchema = z5.object({
  courseOfferingId: z5.string().trim(),
  type: z5.string().trim(),
  toalMarks: z5.number().min(1),
  examDate: z5.coerce.date("Start date must be a valid date")
});
var ExamValidation = {
  ExamCreateZodSchema
};

// src/app/module/exam/exam.route.ts
var router6 = Router6();
router6.post(
  "/",
  auth(Role.INSTRUCTOR),
  validateRequest(ExamValidation.ExamCreateZodSchema),
  ExamController.createExam
);
var ExamRoutes = router6;

// src/app/module/result/result.route.ts
import { Router as Router7 } from "express";

// src/app/module/result/result.controller.ts
import httpStatus18 from "http-status";

// src/app/module/result/result.service.ts
import httpStatus17 from "http-status";
var createResult = async (payload) => {
  const { examId, courseRegistrationId, grade, gradePoint, marks } = payload;
  const isCourseRedistrationExists = await prisma.courseRegistration.findUnique(
    {
      where: { id: courseRegistrationId },
      include: {
        courseOffering: true
      }
    }
  );
  if (!isCourseRedistrationExists) {
    throw new AppError(httpStatus17.NOT_FOUND, "Course Not Found");
  }
  const isExamExists = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      courseOffering: true
    }
  });
  if (!isExamExists) {
    throw new AppError(httpStatus17.NOT_FOUND, "Exam Not Found");
  }
  if (isCourseRedistrationExists.courseOfferingId !== isExamExists.courseOfferingId) {
    throw new AppError(httpStatus17.FORBIDDEN, "Offered Course Not Matched");
  }
  const result = await prisma.result.create({
    data: {
      examId,
      courseRegistrationId,
      grade,
      gradePoint,
      marks
    },
    include: {
      exam: {
        include: {
          courseOffering: {
            include: {
              course: true
            }
          }
        }
      }
    }
  });
  return result;
};
var ResultService = {
  createResult
};

// src/app/module/result/result.controller.ts
var createResult2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ResultService.createResult(payload);
  sendResponse(res, {
    statusCode: httpStatus18.OK,
    success: true,
    message: "Result Created successfully",
    data: result
  });
});
var ResultController = {
  createResult: createResult2
};

// src/app/module/result/result.validation.ts
import z6 from "zod";
var ResultCreateZodSchema = z6.object({
  examId: z6.string().trim(),
  courseRegistrationId: z6.string().trim(),
  grade: z6.string().trim(),
  marks: z6.number().min(0),
  gradePoint: z6.number().min(0)
});
var ResultValidation = {
  ResultCreateZodSchema
};

// src/app/module/result/result.route.ts
var router7 = Router7();
router7.post(
  "/",
  auth(Role.INSTRUCTOR),
  validateRequest(ResultValidation.ResultCreateZodSchema),
  ResultController.createResult
);
var ResultRoutes = router7;

// src/app/module/semester/semester.route.ts
import { Router as Router8 } from "express";

// src/app/module/semester/semester.controller.ts
import httpStatus19 from "http-status";

// src/app/module/semester/semester.service.ts
var getAllSemester = async () => {
  const semesters = await prisma.semester.findMany({
    where: {},
    include: {
      courseOfferings: {
        include: {
          course: {
            include: {
              program: true
            }
          }
        }
      }
    }
  });
  return semesters;
};
var SemesterService = {
  getAllSemester
};

// src/app/module/semester/semester.controller.ts
var getAllSemester2 = catchAsync(async (req, res) => {
  const result = await SemesterService.getAllSemester();
  sendResponse(res, {
    statusCode: httpStatus19.OK,
    success: true,
    message: "Semesters fetched successfully",
    data: result
  });
});
var SemesterController = {
  getAllSemester: getAllSemester2
};

// src/app/module/semester/semester.route.ts
var router8 = Router8();
router8.get(
  "/",
  auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
  SemesterController.getAllSemester
);
var SemesterRoutes = router8;

// src/app/module/transcript/transcript.route.ts
import { Router as Router9 } from "express";

// src/app/module/transcript/transcript.controller.ts
import httpStatus21 from "http-status";

// src/app/module/transcript/transcript.service.ts
import httpStatus20 from "http-status";
var createTranscript = async (payload) => {
  const { semesterId, studentId } = payload;
  const student = await prisma.student.findUnique({
    where: { id: studentId }
  });
  if (!student) {
    throw new AppError(httpStatus20.NOT_FOUND, "Student Not Found");
  }
  const semester = await prisma.semester.findUnique({
    where: { id: semesterId }
  });
  if (!semester) {
    throw new AppError(httpStatus20.NOT_FOUND, "Semester Not Found");
  }
  const isTranscriptExists = await prisma.transcript.findFirst({
    where: {
      semesterId,
      studentId
    }
  });
  if (isTranscriptExists) {
    throw new AppError(httpStatus20.BAD_REQUEST, "Transcript Already Generated");
  }
  const courseRegistrations = await prisma.courseRegistration.findMany({
    where: {
      studentId,
      courseOffering: {
        semesterId
      }
    },
    include: {
      courseOffering: {
        include: {
          course: true,
          exam: {
            include: {
              results: true
            }
          }
        }
      }
    }
  });
  if (courseRegistrations.length === 0) {
    throw new AppError(httpStatus20.BAD_REQUEST, "No Course Registration Found");
  }
  let totalCredit = 0;
  let earnedCredit = 0;
  let totalGradePoint = 0;
  for (const registration of courseRegistrations) {
    const course = registration.courseOffering.course;
    const result = registration.courseOffering.exam?.results[0];
    if (!course) continue;
    const credit = Number(course.credit);
    totalCredit += credit;
    if (!result) continue;
    const gradePoint = Number(result.gradePoint);
    if (gradePoint >= 2) {
      earnedCredit += credit;
    }
    totalGradePoint += credit * gradePoint;
  }
  const gpa = totalCredit > 0 ? Number((totalGradePoint / totalCredit).toFixed(2)) : 0;
  const previousTranscripts = await prisma.transcript.findMany({
    where: {
      studentId,
      semesterId: {
        not: semesterId
      }
    }
  });
  let cgpa = gpa;
  if (previousTranscripts.length > 0) {
    const previousCredit = previousTranscripts.reduce(
      (sum, transcript2) => sum + Number(transcript2.totalCredit),
      0
    );
    const previousGradePoint = previousTranscripts.reduce(
      (sum, transcript2) => sum + Number(transcript2.totalCredit) * Number(transcript2.gpa),
      0
    );
    cgpa = previousCredit + totalCredit > 0 ? Number(
      ((previousGradePoint + totalGradePoint) / (previousCredit + totalCredit)).toFixed(2)
    ) : 0;
  }
  const transcript = await prisma.transcript.create({
    data: {
      studentId,
      semesterId,
      totalCredit,
      earnedCredit,
      gpa,
      cgpa
    }
  });
  return transcript;
};
var TranscriptService = {
  createTranscript
};

// src/app/module/transcript/transcript.controller.ts
var createTranscript2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await TranscriptService.createTranscript(payload);
  sendResponse(res, {
    statusCode: httpStatus21.OK,
    success: true,
    message: "Transcript Created successfully",
    data: result
  });
});
var TranscriptController = {
  createTranscript: createTranscript2
};

// src/app/module/transcript/transcript.validation.ts
import z7 from "zod";
var TranscriptCreateZodSchema = z7.object({
  studentId: z7.string().trim(),
  semesterId: z7.string().trim()
});
var TranscriptValidation = {
  TranscriptCreateZodSchema
};

// src/app/module/transcript/transcript.route.ts
var router9 = Router9();
router9.post(
  "/",
  auth(Role.INSTRUCTOR),
  validateRequest(TranscriptValidation.TranscriptCreateZodSchema),
  TranscriptController.createTranscript
);
var TranscriptRoutes = router9;

// src/app/module/user/user.route.ts
import { Router as Router10 } from "express";

// src/app/module/user/user.controller.ts
import httpStatus23 from "http-status";

// src/app/module/user/user.service.ts
import httpStatus22 from "http-status";
var getMe = async (user) => {
  const isUserExisting = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    omit: {
      password: true
    }
  });
  if (!isUserExisting) {
    throw new AppError(httpStatus22.NOT_FOUND, "User Not Found");
  }
  return isUserExisting;
};
var updateProfileImage = async (buffer, userId) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      imagePublicId: true,
      imageUrl: true
    }
  });
  const cloudinaryResult = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(
            new AppError(
              httpStatus22.BAD_GATEWAY,
              "No Result Return From Cloudinary"
            )
          );
        }
        resolve(result);
      }).end(buffer);
    }
  );
  const updateUser = await prisma.user.update({
    where: { id: userId },
    data: {
      imageUrl: cloudinaryResult?.secure_url,
      imagePublicId: cloudinaryResult?.public_id
    },
    omit: { password: true }
  });
  if (currentUser?.imagePublicId && currentUser.imageUrl) {
    await cloudinary.uploader.destroy(currentUser.imagePublicId);
  }
  return updateUser;
};
var UserService = {
  getMe,
  updateProfileImage
};

// src/app/module/user/user.controller.ts
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(
      httpStatus23.UNAUTHORIZED,
      "User information is missing in the request"
    );
  }
  const result = await UserService.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus23.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var updateProfileImage2 = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  if (!req.file) {
    throw new Error("No File Provided.");
  }
  const result = await UserService.updateProfileImage(
    req.file?.buffer,
    userId
  );
  sendResponse(res, {
    statusCode: httpStatus23.OK,
    success: true,
    message: "Profile Image Update Successfully",
    data: result
  });
});
var UserController = {
  getMe: getMe2,
  updateProfileImage: updateProfileImage2
};

// src/app/module/user/user.route.ts
var router10 = Router10();
router10.get(
  "/me",
  auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
  UserController.getMe
);
router10.patch(
  "/profile-image",
  auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
  upload.single("profileImage"),
  UserController.updateProfileImage
);
var UserRoutes = router10;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: config_default.frontend_url,
    credentials: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/course-offering", CourseOfferingRoutes);
app.use("/api/v1/semester", SemesterRoutes);
app.use("/api/v1/course-registration", CourseRegistrationRoutes);
app.use("/api/v1/attendance", AttendanceRoutes);
app.use("/api/v1/exam", ExamRoutes);
app.use("/api/v1/result", ResultRoutes);
app.use("/api/v1/transcript", TranscriptRoutes);
app.get("/", async (req, res) => {
  res.status(httpStatus24.OK).json({
    success: true,
    message: "Welcome University Management System Backend"
  });
});
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/app/utils/seed.ts
import bcrypt3 from "bcryptjs";
var seedSuperAdmin = async () => {
  try {
    const isSuperAdmin = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN
      }
    });
    if (isSuperAdmin) {
      console.log("Super Admin Already Exists!");
      return;
    }
    const name = config_default.super_admin_name;
    const email = config_default.super_admin_email;
    const password = config_default.super_admin_password;
    if (!name || !email || !password) {
      throw new Error(
        "Super Admin Name, Email & Password Missing In Env File!!!"
      );
    }
    const hashedPassword = await bcrypt3.hash(
      password,
      Number(config_default.bcrypt_salt_rounds)
    );
    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        needPasswordChange: false,
        emailVerified: true
      }
    });
    console.log("Super Admin Created : ", superAdmin);
  } catch (error) {
    console.log("Error Seeding Super Admin: ", error);
    await prisma.user.delete({
      where: {
        email: config_default.super_admin_email
      }
    });
  }
};
var seedTesterAdmin = async () => {
  try {
    const isTesterAdmin = await prisma.user.findUnique({
      where: {
        email: config_default.tester_admin_email
      }
    });
    if (isTesterAdmin) {
      console.log("Tester Admin Already Exists!");
      return;
    }
    const name = config_default.tester_admin_name;
    const email = config_default.tester_admin_email;
    const password = config_default.tester_admin_password;
    if (!name || !email || !password) {
      throw new Error(
        "Tester Admin Name, Email & Password Missing In Env File!!!"
      );
    }
    const hashedPassword = await bcrypt3.hash(
      password,
      Number(config_default.bcrypt_salt_rounds)
    );
    const testerAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.ADMIN,
        needPasswordChange: false,
        emailVerified: true
      }
    });
    console.log("Teater Admin Created : ", testerAdmin);
  } catch (error) {
    console.log("Error Seeding Teater Admin: ", error);
    await prisma.user.delete({
      where: {
        email: config_default.tester_admin_email
      }
    });
  }
};

// src/server.ts
var PORT = config_default.port;
async function main() {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully");
    await redisClient.connect();
    console.log("Redis Connected Successfully");
    await transporter.verify();
    console.log("Nodemailer Connected Successfully");
    await seedSuperAdmin();
    await seedTesterAdmin();
    app_default.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error Starting the Server:`, error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.js.map