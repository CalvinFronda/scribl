// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   PenTool,
//   Users,
//   Calendar,
//   BookOpen,
//   Lightbulb,
//   Target,
// } from "lucide-react";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="container mx-auto px-4 py-6">
//         <nav className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <PenTool className="h-8 w-8 text-indigo-600" />
//             <span className="text-2xl font-bold text-gray-900">WriteDaily</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* <Link href="/write" className="text-gray-600 hover:text-gray-900">
//               Write
//             </Link>
//             <Link
//               href="/dashboard"
//               className="text-gray-600 hover:text-gray-900"
//             >
//               Dashboard
//             </Link> */}
//             <Button variant="outline">Sign In</Button>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-16 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-5xl font-bold text-gray-900 mb-6">
//             Transform Your Writing, One Prompt at a Time
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Break through writer's block with daily prompts designed to spark
//             creativity, improve communication skills, and build a consistent
//             writing habit.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/write">
//               <Button size="lg" className="text-lg px-8 py-3">
//                 Start Writing Today
//               </Button>
//             </Link>
//             <Button
//               variant="outline"
//               size="lg"
//               className="text-lg px-8 py-3 bg-transparent"
//             >
//               View Sample Prompts
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container mx-auto px-4 py-16">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Why Writers Choose WriteDaily
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Our platform is designed specifically for aspiring writers who want
//             to develop their voice and improve their communication skills.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
//               <CardTitle>Daily Fresh Prompts</CardTitle>
//               <CardDescription>
//                 Get a new, carefully curated writing prompt every day to keep
//                 your creativity flowing.
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <Target className="h-12 w-12 text-indigo-600 mb-4" />
//               <CardTitle>Focused Writing Environment</CardTitle>
//               <CardDescription>
//                 Clean, distraction-free interface that keeps your prompt visible
//                 while you write.
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <Users className="h-12 w-12 text-indigo-600 mb-4" />
//               <CardTitle>Share or Keep Private</CardTitle>
//               <CardDescription>
//                 Choose to publish your responses to inspire others or keep them
//                 private for personal growth.
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
//               <CardTitle>Track Your Progress</CardTitle>
//               <CardDescription>
//                 See your writing journey unfold with a personal dashboard of all
//                 your responses.
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <Lightbulb className="h-12 w-12 text-indigo-600 mb-4" />
//               <CardTitle>Overcome Writer's Block</CardTitle>
//               <CardDescription>
//                 Never stare at a blank page again with prompts designed to spark
//                 immediate inspiration.
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <PenTool className="h-12 w-12 text-indigo-600 mb-4" />
//               <CardTitle>Build Writing Habits</CardTitle>
//               <CardDescription>
//                 Develop consistency and discipline with daily writing practice
//                 that fits your schedule.
//               </CardDescription>
//             </CardHeader>
//           </Card>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-indigo-600 py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Ready to Become a Better Writer?
//           </h2>
//           <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of writers who are improving their skills one prompt
//             at a time.
//           </p>
//           <Link href="/write">
//             <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
//               Get Today's Prompt
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <PenTool className="h-6 w-6" />
//                 <span className="text-xl font-bold">WriteDaily</span>
//               </div>
//               <p className="text-gray-400">
//                 Helping writers find their voice through daily practice and
//                 inspiration.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Product</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="/write" className="hover:text-white">
//                     Write
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/dashboard" className="hover:text-white">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/prompts" className="hover:text-white">
//                     Browse Prompts
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Community</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="/published" className="hover:text-white">
//                     Published Stories
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/writers" className="hover:text-white">
//                     Featured Writers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/challenges" className="hover:text-white">
//                     Writing Challenges
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="/help" className="hover:text-white">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="hover:text-white">
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="hover:text-white">
//                     Privacy Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 WriteDaily. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
