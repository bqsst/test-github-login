import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/supabaseClient';
import bcrypt from 'bcryptjs';
import validator from 'validator';

export async function POST(req: NextRequest) {
   try {
      const { email, password } = await req.json();

      if (!email || !password) {
         return NextResponse.json({ error: 'Please fill email and password.' }, { status: 400 });
      }
      if (!validator.isEmail(email)) {
         return NextResponse.json({ error: 'Please fill a correct email.' }, { status: 400 });
      }
      if (password.length < 3) {
         return NextResponse.json({ error: 'Password must be more than 3 characters.' }, { status: 400 });
      }

      const { data: user, error: findError } = await supabase
         .from('users') 
         .select('*')
         .eq('email', email)
         .single();

      if (findError) {
         console.error("Error finding user:", findError);
         return NextResponse.json({ error: 'Email is not match' }, { status: 400 });
      }

      if (!user) {
         return NextResponse.json({ error: 'Email is not match' }, { status: 400 });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return NextResponse.json({ error: 'Email or password invalid' }, { status: 400 });
      }

      return NextResponse.json({ message: 'Login successfully' });
   } catch (err) {
      console.log(err);
      return NextResponse.json({ error: 'Failed to handle request.' }, { status: 500 });
   }
}
