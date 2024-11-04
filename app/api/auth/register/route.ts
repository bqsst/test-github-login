import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/supabaseClient'; 
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
   try {
      const formData = await req.formData();
      
      const fullname = formData.get('fullname') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const phone = formData.get('phone') as string;
      const attachment = formData.get('attachment') as File;

      const fileName = uuidv4();

      if (!fullname || !email || !password || !phone || !attachment) {
         return NextResponse.json({ error: 'Please fill all data.' }, { status: 400 });
      }
      if (!validator.isEmail(email)) {
         return NextResponse.json({ error: 'Please fill a correct email.' }, { status: 400 });
      }

      const { data: existingUser, error: findError } = await supabase
         .from('users') 
         .select('*')
         .eq('email', email);

      if (findError) {
         console.error("Error finding user:", findError);
         return NextResponse.json({ error: 'Error checking user.' }, { status: 500 });
      }

      if (existingUser && existingUser.length > 0) {
         return NextResponse.json({ error: 'This email already exists.' }, { status: 400 });
      }

      if (password.length < 3) {
         return NextResponse.json({ error: 'Password must be more than 3 characters.' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const { error: uploadError } = await supabase.storage
         .from('attachments')
         .upload(`user-attachments/${fileName}`, attachment);

      if (uploadError) {
         console.error("Error uploading attachment:", uploadError);
         return NextResponse.json({ error: 'Failed to upload attachment.' }, { status: 500 });
      }

      const { data: publicUrlData } = supabase.storage
         .from('attachments')
         .getPublicUrl(`user-attachments/${fileName}`);

      const { error: insertError } = await supabase
         .from('users')
         .insert([
            {
               fullname,
               email,
               password: hashedPassword,
               phone,
               attachment: publicUrlData.publicUrl
            }
         ]);

      if (insertError) {
         console.error("Error inserting user:", insertError);
         return NextResponse.json({ error: 'Failed to create new user.' }, { status: 500 });
      }

      console.log('New user created: ', { fullname, email });
      return NextResponse.json({ message: 'Register Successfully' });
   } catch (err) {
      console.log(err);
      return NextResponse.json({ error: 'Failed to handle request' }, { status: 500 });
   }
}