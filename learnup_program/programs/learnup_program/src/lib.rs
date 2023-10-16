use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as TokenTransfer};

declare_id!("ENdQMhEY4G3mEMz9yFAVCV2aRJW4VVeqX1VeX2X3iZzP");

#[program]
pub mod learnup_program {
    use super::*;

    pub fn initialize(ctx: Context<InitializeInfoCourses>, init_course: InitCourse) -> Result<()> {
        let info_courses: &mut Account<InfoCourses> = &mut ctx.accounts.info_courses;

        info_courses.percentage_instructor = init_course.percentage_instructor;
        info_courses.percentage_treasury = init_course.percentage_treasury;
        info_courses.token_address = init_course.token_address;
        info_courses.treasury_address = init_course.treasury_address;

        Ok(())
    }

    pub fn create_student(
        ctx: Context<CreateStudent>,
        name: String,
        ref_view: String,
    ) -> Result<()> {
        let student: &mut Account<Student> = &mut ctx.accounts.student;
        let student_key: &Signer = &ctx.accounts.student_key;
        let clock: Clock = Clock::get().unwrap();

        student.created_at = clock.unix_timestamp;
        student.name = name;
        student.account_key = *student_key.key;
        student.ref_view = ref_view;

        Ok(())
    }

    pub fn create_instructor(
        ctx: Context<CreateInstructor>,
        name: String,
        ref_view: String,
    ) -> Result<()> {
        let instructor: &mut Account<Instructor> = &mut ctx.accounts.instructor;
        let instructor_key: &Signer = &ctx.accounts.instructor_key;
        let clock: Clock = Clock::get().unwrap();

        instructor.created_at = clock.unix_timestamp;
        instructor.name = name;
        instructor.account_key = *instructor_key.key;
        instructor.ref_view = ref_view;

        Ok(())
    }

    pub fn create_course(
        ctx: Context<CreateCourse>,
        title: String,
        course_view: String,
        course_content: String,
        amount: u64,
    ) -> Result<()> {
        let course: &mut Account<Course> = &mut ctx.accounts.course;
        let instructor: &mut Account<Instructor> = &mut ctx.accounts.instructor;
        let clock: Clock = Clock::get().unwrap();

        if title.chars().count() > 120 {
            return err!(CourseErrorCode::TitleTooLong);
        }

        if course_content.chars().count() > 180 {
            return err!(CourseErrorCode::CourseUriTooLong);
        }

        if course_view.chars().count() > 180 {
            return err!(CourseErrorCode::CourseUriTooLong);
        }

        course.instructor = instructor.key();
        course.timestamp = clock.unix_timestamp;
        course.title = title;
        course.course_content = course_content;
        course.course_view = course_view;
        course.course_amount = amount;

        emit!(CourseCreatedEvent {
            course: course.key(),
            instructor: instructor.key(),
            amount: amount,
        });

        msg!("Course Account Created");
        msg!("Current: { }", course.title);

        Ok(())
    }

    pub fn add_course(ctx: Context<AddCourse>) -> Result<()> {
        let student_course: &mut Account<StudentCourse> = &mut ctx.accounts.student_course;
        let course: &mut Account<Course> = &mut ctx.accounts.course;
        let student: &mut Account<Student> = &mut ctx.accounts.student;
        let clock: Clock = Clock::get().unwrap();

        //associate the student with the course.
        student_course.course_key = course.key();
        student_course.student_key = student.key();
        student_course.student_key = student.key();
        student_course.created_at = clock.unix_timestamp;
        student_course.amount_pay = course.course_amount.clone();

        Ok(())
    }

    pub fn pay_course(ctx: Context<PayCourse>) -> Result<()> {
        let course: &mut Account<Course> = &mut ctx.accounts.course;
        let instructor_tk: &mut Account<TokenAccount> = &mut ctx.accounts.instructor_tk;
        let treasury_tk: &mut Account<TokenAccount> = &mut ctx.accounts.treasury_tk;
        let student_tk: &mut Account<TokenAccount> = &mut ctx.accounts.student_tk;
        let info: &mut Account<InfoCourses> = &mut ctx.accounts.info;
        let token_program = &ctx.accounts.token_program;

        let amount_instructor = course
            .course_amount
            .checked_mul(info.percentage_instructor)
            .unwrap()
            .checked_div(10000)
            .unwrap();

        let amount_treasury = course
            .course_amount
            .checked_mul(info.percentage_treasury)
            .unwrap()
            .checked_div(10000)
            .unwrap();
        //pay.
        // student to treasury
        let cpi_acc_student_treasury = TokenTransfer {
            from: student_tk.to_account_info().clone(),
            to: treasury_tk.to_account_info().clone(),
            authority: student_tk.to_account_info().clone(),
        };

        token::transfer(
            CpiContext::new(token_program.to_account_info(), cpi_acc_student_treasury),
            amount_treasury,
        )?;

        // student to instructor
        let cpi_acc_student_instructor = TokenTransfer {
            from: student_tk.to_account_info().clone(),
            to: instructor_tk.to_account_info().clone(),
            authority: student_tk.to_account_info().clone(),
        };

        token::transfer(
            CpiContext::new(token_program.to_account_info(), cpi_acc_student_instructor),
            amount_instructor,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateStudent<'info> {
    #[account(init, payer = student_key, space = Course::LEN)]
    pub student: Account<'info, Student>,
    #[account(mut)]
    pub student_key: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateInstructor<'info> {
    #[account(init, payer = instructor_key, space = Course::LEN)]
    pub instructor: Account<'info, Instructor>,
    #[account(mut)]
    pub instructor_key: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateCourse<'info> {
    #[account(init, payer = pay, space = Course::LEN)]
    pub course: Account<'info, Course>,
    #[account(mut)]
    pub pay: Signer<'info>,
    #[account(mut)]
    pub instructor: Account<'info, Instructor>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddCourse<'info> {
    #[account(init, payer = student, space = 4*64)]
    pub student_course: Account<'info, StudentCourse>,
    #[account(mut)]
    pub course: Account<'info, Course>,
    #[account(mut)]
    pub student: Account<'info, Student>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PayCourse<'info> {
    #[account(mut)]
    pub course: Account<'info, Course>,
    #[account(mut)]
    pub info: Account<'info, InfoCourses>,
    pub student_sig: Signer<'info>,
    #[account(mut)]
    pub student_tk: Account<'info, TokenAccount>,
    #[account(mut)]
    pub instructor_tk: Account<'info, TokenAccount>,
    #[account(mut)]
    pub treasury_tk: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Course {
    pub instructor: Pubkey,
    pub timestamp: i64,
    pub title: String,
    pub course_view: String,
    pub course_content: String,
    pub course_amount: u64,
}

#[account]
pub struct Instructor {
    pub created_at: i64,
    pub name: String,
    pub account_key: Pubkey,
    pub ref_view: String,
}

#[account]
pub struct Student {
    pub created_at: i64,
    pub name: String,
    pub account_key: Pubkey,
    pub ref_view: String,
}

#[account]
pub struct StudentCourse {
    pub created_at: i64,
    pub finished_at: i64,
    pub course_key: Pubkey,
    pub student_key: Pubkey,
    pub amount_pay: u64,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TITLE_LENGTH: usize = 120 * 4; // 120 chars max.
const MAX_COURSE_URI_LENGTH: usize = 200 * 4; // 200 chars max.

impl Course {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TITLE_LENGTH // Title.
        + STRING_LENGTH_PREFIX + MAX_COURSE_URI_LENGTH // course_uri_view
        + STRING_LENGTH_PREFIX + MAX_COURSE_URI_LENGTH; // course_uri_content
}

#[derive(Accounts)]
pub struct InitializeInfoCourses<'info> {
    #[account(init, payer = admin, space = 8 + 2048)]
    pub info_courses: Account<'info, InfoCourses>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct InfoCourses {
    pub percentage_treasury: u64,
    pub percentage_instructor: u64,
    pub token_address: Pubkey,
    pub treasury_address: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct InitCourse {
    pub percentage_treasury: u64,
    pub percentage_instructor: u64,
    pub token_address: Pubkey,
    pub treasury_address: Pubkey,
}

#[error_code]
pub enum CourseErrorCode {
    #[msg("The provided title should be 120 characters long maximum.")]
    TitleTooLong,
    #[msg("The provided content should be 180 characters long maximum.")]
    CourseUriTooLong,
}

#[event]
pub struct CourseCreatedEvent {
    pub course: Pubkey,
    pub instructor: Pubkey,
    pub amount: u64,
}
