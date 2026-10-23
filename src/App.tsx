import "./App.css";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select } from "./components/ui/select";

function App() {
  return (
    <div className="">
      <h1 className="tw:text-3xl tw:font-bold">Button Component</h1>
      <div className="tw:flex tw:gap-4 tw:flex-col tw:md:flex-row tw:items-center tw:justify-center tw:mt-4">
        <Checkbox></Checkbox>
        <Button variant="default">Add story</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <Card size="sm" className="tw:w-90">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Badge variant="outline">Active</Badge>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> */}
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="tw:flex tw:flex-col tw:gap-6">
              <div className="tw:grid tw:gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="tw:grid tw:gap-2">
                <div className="tw:flex tw:items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="tw:ml-auto tw:inline-block tw:text-sm tw:underline-offset-4 tw:hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="tw:flex-col tw:gap-2">
          <Button type="submit" className="tw:w-full">
            Login
          </Button>
          <Button variant="outline" className="tw:w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
