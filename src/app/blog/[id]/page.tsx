'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';

// Define types for our blog post
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

// Sample blog posts data (same as in blog/page.tsx)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Online Learning: Trends to Watch in 2023',
    excerpt: 'Explore the emerging trends in e-learning that are shaping the future of education and how they might impact your learning journey.',
    content: `
      <p>The landscape of online education is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we move through 2023, several key trends are shaping the future of e-learning and transforming how students engage with educational content.</p>
      
      <h2>Artificial Intelligence and Personalized Learning</h2>
      <p>AI-powered learning platforms are revolutionizing the educational experience by creating truly personalized learning paths. These systems analyze student performance, learning preferences, and engagement patterns to tailor content delivery, pacing, and assessment methods to individual needs.</p>
      <p>Adaptive learning technologies can now identify knowledge gaps and automatically adjust course materials to address these areas, ensuring that each student receives the support they need to succeed.</p>
      
      <h2>Immersive Learning Experiences</h2>
      <p>Virtual Reality (VR) and Augmented Reality (AR) are moving beyond novelty applications to become integral tools in online education. These technologies create immersive learning environments that can simulate real-world scenarios, allowing students to gain practical experience in a safe, controlled setting.</p>
      <p>From medical students practicing surgical procedures to engineering students exploring complex mechanical systems, immersive technologies are bridging the gap between theoretical knowledge and practical application.</p>
      
      <h2>Microlearning and Modular Content</h2>
      <p>The shift toward bite-sized, modular learning content continues to gain momentum. Microlearning breaks complex subjects into manageable chunks that can be consumed in short sessions, making it easier for busy professionals to fit education into their schedules.</p>
      <p>This approach not only improves knowledge retention but also allows for more flexible, personalized learning paths as students can mix and match modules based on their specific goals and interests.</p>
      
      <h2>Social and Collaborative Learning</h2>
      <p>Despite the digital nature of online education, the importance of human connection in the learning process remains paramount. Advanced collaboration tools, virtual study groups, and community-based learning platforms are enhancing the social aspects of online education.</p>
      <p>These features help combat the isolation that can sometimes accompany distance learning, creating supportive communities where students can share insights, ask questions, and work together on projects.</p>
      
      <h2>Conclusion</h2>
      <p>As these trends continue to develop and intersect, the future of online learning looks increasingly dynamic, accessible, and effective. By embracing these innovations, educational institutions and learners alike can harness the full potential of digital education to achieve their goals in an ever-changing world.</p>
    `,
    author: 'Sarah Johnson',
    authorBio: 'Sarah Johnson is an EdTech specialist with over 10 years of experience in designing digital learning experiences. She holds a Ph.D. in Educational Technology from Stanford University.',
    authorImage: '/images/author-1.jpg',
    date: 'June 15, 2023',
    readTime: '8 min read',
    category: 'Education',
    tags: ['E-Learning', 'EdTech', 'Future Trends'],
    image: '/images/blog-1.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'How to Stay Motivated During Your Online Course',
    excerpt: 'Maintaining motivation during self-paced online learning can be challenging. Discover practical strategies to stay engaged and complete your courses.',
    content: `
      <p>Online learning offers incredible flexibility and access to education, but it also comes with unique challenges. Without the structure of a traditional classroom and face-to-face interactions, many students struggle to maintain motivation throughout their online courses.</p>
      
      <h2>Set Clear, Achievable Goals</h2>
      <p>One of the most effective ways to stay motivated is to establish specific, measurable goals for your learning journey. Break down your course into manageable milestones and celebrate your achievements along the way.</p>
      <p>Consider creating both short-term goals (completing a module by the end of the week) and long-term goals (finishing the course by a certain date) to maintain focus and direction.</p>
      
      <h2>Create a Dedicated Learning Environment</h2>
      <p>Your physical environment significantly impacts your ability to focus and engage with course materials. Designate a specific area in your home for studying that is comfortable, well-lit, and free from distractions.</p>
      <p>Personalize this space with elements that inspire you, whether that's motivational quotes, plants, or specific lighting that helps you concentrate.</p>
      
      <h2>Establish a Consistent Routine</h2>
      <p>Structure is crucial for online learning success. Develop a regular schedule for your studies and treat these time blocks with the same commitment you would give to a traditional class or work meeting.</p>
      <p>Be realistic about when you're most alert and productive, and schedule your most challenging coursework during these peak periods.</p>
      
      <h2>Engage with the Learning Community</h2>
      <p>Combat isolation by actively participating in discussion forums, study groups, and other community features of your online course. Sharing ideas, asking questions, and helping fellow students creates a sense of accountability and connection.</p>
      <p>Consider finding an accountability partner who is taking the same or a similar course to share progress, challenges, and encouragement.</p>
      
      <h2>Implement Effective Reward Systems</h2>
      <p>Create a personal reward system that acknowledges your progress and reinforces positive study habits. These rewards don't need to be elaborate – even small treats like a coffee break, a short walk, or time for a favorite hobby can be powerful motivators.</p>
      <p>The key is to make the rewards meaningful to you and proportionate to the achievement they're celebrating.</p>
      
      <h2>Conclusion</h2>
      <p>Staying motivated during online learning is a skill that improves with practice and intentionality. By implementing these strategies and remaining flexible enough to adjust your approach when needed, you can maintain enthusiasm for your studies and successfully complete your online courses.</p>
    `,
    author: 'David Chen',
    authorBio: 'David Chen is a learning psychologist specializing in online education. He has helped thousands of students develop effective study strategies through his courses and coaching programs.',
    authorImage: '/images/author-2.jpg',
    date: 'May 28, 2023',
    readTime: '6 min read',
    category: 'Learning Tips',
    tags: ['Motivation', 'Study Tips', 'Online Learning'],
    image: '/images/blog-2.jpg',
    featured: false
  },
  {
    id: 3,
    title: 'The Benefits of Project-Based Learning in Technical Courses',
    excerpt: 'Learn how project-based learning approaches can enhance your technical skills and prepare you for real-world challenges in the workplace.',
    content: `
      <p>Traditional lecture-based learning has its place in education, but when it comes to technical subjects, project-based learning (PBL) offers distinct advantages that can significantly enhance skill development and knowledge retention.</p>
      
      <h2>Real-World Application of Concepts</h2>
      <p>Project-based learning bridges the gap between theory and practice by challenging students to apply concepts to authentic problems. This approach is particularly valuable in technical fields where abstract principles must translate into practical solutions.</p>
      <p>When students work on projects that mirror real-world scenarios, they develop a deeper understanding of how their knowledge applies in professional contexts, making the learning experience more relevant and engaging.</p>
      
      <h2>Development of Technical and Soft Skills</h2>
      <p>Technical projects require not only subject-specific knowledge but also critical thinking, problem-solving, and decision-making skills. As students navigate challenges and setbacks in their projects, they develop resilience and adaptability – qualities highly valued in the workplace.</p>
      <p>Additionally, many technical projects involve collaboration, providing opportunities to enhance communication, teamwork, and leadership abilities alongside technical expertise.</p>
      
      <h2>Portfolio Building for Career Advancement</h2>
      <p>One of the most tangible benefits of project-based learning is the creation of a professional portfolio. In technical fields, employers often value demonstrated capabilities over academic credentials alone.</p>
      <p>Each completed project becomes evidence of your skills and approach to problem-solving, giving you concrete examples to discuss during interviews and distinguishing you from candidates with theoretical knowledge but limited practical experience.</p>
      
      <h2>Enhanced Motivation and Engagement</h2>
      <p>Working on meaningful projects that produce visible results can significantly increase motivation compared to abstract exercises or examinations. The sense of ownership and accomplishment that comes from creating something functional or solving a complex problem drives deeper engagement with the learning material.</p>
      <p>This intrinsic motivation often leads students to explore beyond the required curriculum, developing specialized knowledge in areas of personal interest.</p>
      
      <h2>Preparation for Industry Practices</h2>
      <p>Modern technical workplaces increasingly use agile methodologies, iterative development, and collaborative tools. Project-based learning can incorporate these industry-standard practices, familiarizing students with professional workflows before they enter the job market.</p>
      <p>This exposure reduces the learning curve when transitioning from education to employment and helps students develop habits that align with industry expectations.</p>
      
      <h2>Conclusion</h2>
      <p>While project-based learning requires more time and resources than traditional instructional methods, its benefits for technical education are substantial. By emphasizing practical application, fostering both technical and soft skills, and preparing students for workplace realities, PBL creates more capable, confident, and adaptable technical professionals.</p>
    `,
    author: 'Michael Brown',
    authorBio: 'Michael Brown is a software engineering instructor with 15 years of industry experience. He advocates for hands-on, project-based approaches to technical education based on his observations of student success.',
    authorImage: '/images/author-3.jpg',
    date: 'May 12, 2023',
    readTime: '10 min read',
    category: 'Teaching Methods',
    tags: ['Project-Based Learning', 'Technical Skills', 'Practical Learning'],
    image: '/images/blog-3.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'From Beginner to Pro: A Web Developer\'s Journey',
    excerpt: 'Follow the inspiring journey of a self-taught web developer who transitioned from a non-technical background to a successful career in tech.',
    content: `
      <p>Three years ago, I was working in retail management with no technical background beyond basic computer skills. Today, I'm a senior front-end developer at a tech startup. My journey from complete beginner to professional web developer wasn't always smooth, but it taught me valuable lessons about learning, perseverance, and the ever-evolving tech industry.</p>
      
      <h2>The Decision to Change Careers</h2>
      <p>My journey began with frustration – I felt unchallenged in my retail role and saw limited opportunities for growth. After researching various career paths, web development stood out for its creativity, problem-solving aspects, and strong job market.</p>
      <p>The low barrier to entry was also appealing; I could start learning immediately with just my laptop and an internet connection, without needing to invest in an expensive degree program right away.</p>
      
      <h2>The Early Learning Phase</h2>
      <p>I started with HTML and CSS, creating simple static websites and following along with tutorial videos. Those first few months were both exciting and overwhelming – I remember the thrill of seeing my code render correctly on screen, but also the confusion of debugging issues that seemed incomprehensible at the time.</p>
      <p>The key breakthrough came when I stopped just following tutorials and started building my own projects. Even simple ones like a personal portfolio or a landing page for a fictional business forced me to solve problems independently and truly understand the concepts.</p>
      
      <h2>Tackling JavaScript and Beyond</h2>
      <p>JavaScript presented a significant challenge as my first programming language. The concepts of variables, functions, and especially asynchronous programming initially felt like learning a foreign language without a translator.</p>
      <p>I found that breaking down complex topics into smaller pieces and building projects that used just one new concept at a time helped tremendously. Each small win built confidence that carried me through the inevitable frustrations.</p>
      
      <h2>Building a Portfolio and Finding Community</h2>
      <p>As my skills improved, I focused on creating portfolio projects that showcased my abilities. I rebuilt websites I admired, created tools to solve problems I encountered, and contributed to open-source projects to gain experience working with others' code.</p>
      <p>Joining online communities and local meetups was equally important. The feedback, encouragement, and networking opportunities these provided were invaluable, especially during periods of self-doubt.</p>
      
      <h2>Landing the First Job</h2>
      <p>After about 18 months of consistent learning and building, I secured my first junior developer position. The interview process was intimidating, but my portfolio of real projects and my ability to discuss my problem-solving approach ultimately mattered more than my non-traditional background.</p>
      <p>That first role accelerated my learning exponentially. Working alongside experienced developers and tackling real-world problems provided context and depth that self-study alone couldn't match.</p>
      
      <h2>Continuing Growth and Specialization</h2>
      <p>As I gained experience, I discovered my passion for front-end development and user experience. I focused my continued learning in these areas, becoming proficient with React and modern front-end workflows.</p>
      <p>This specialization, combined with my retail background in understanding customer needs, created a unique skill set that has become my professional strength.</p>
      
      <h2>Advice for Aspiring Developers</h2>
      <p>If you're considering a similar journey, remember that consistency matters more than intensity. Regular practice, even just an hour a day, yields better results than occasional marathon sessions.</p>
      <p>Don't compare your beginning to someone else's middle – focus on your own progress and celebrate small victories. And finally, build things that interest you; passion for your projects will carry you through the inevitable challenges of learning to code.</p>
      
      <h2>Conclusion</h2>
      <p>The path from beginner to professional developer isn't quick or easy, but it's absolutely achievable with persistence and strategic learning. Three years ago, I couldn't have imagined where this journey would take me, but I'm grateful every day for the decision to take that first step.</p>
    `,
    author: 'Emily Zhang',
    authorBio: 'Emily Zhang is a senior front-end developer who transitioned to tech from a retail management background. She now mentors career-changers and writes about accessible pathways into tech careers.',
    authorImage: '/images/author-4.jpg',
    date: 'April 30, 2023',
    readTime: '12 min read',
    category: 'Success Stories',
    tags: ['Career Change', 'Web Development', 'Learning Path'],
    image: '/images/blog-4.jpg',
    featured: true
  },
  {
    id: 5,
    title: 'The Role of AI in Personalized Learning Experiences',
    excerpt: 'Discover how artificial intelligence is revolutionizing education by creating customized learning experiences tailored to individual needs.',
    content: `
      <p>Artificial intelligence is transforming numerous industries, but its impact on education may be among the most profound. By leveraging AI technologies, educational platforms can now deliver truly personalized learning experiences that adapt to individual students' needs, preferences, and progress in ways previously impossible.</p>
      
      <h2>Understanding the Individual Learner</h2>
      <p>Traditional educational approaches often follow a one-size-fits-all model, where all students receive identical instruction regardless of their background knowledge, learning style, or pace. AI-powered systems change this paradigm by continuously gathering and analyzing data about each learner.</p>
      <p>These systems track not just correct and incorrect answers, but patterns of engagement, time spent on different types of content, preferred learning modalities, and even emotional responses through facial recognition and other inputs. This comprehensive learner profile enables truly tailored educational experiences.</p>
      
      <h2>Adaptive Content Delivery</h2>
      <p>With a detailed understanding of each student, AI systems can dynamically adjust content presentation. For students struggling with a concept, the system might provide additional explanations, simpler examples, or more practice opportunities. For those who grasp ideas quickly, it can accelerate the pace or introduce more challenging applications.</p>
      <p>This adaptivity extends to the format of content as well. Visual learners might receive more diagrams and videos, while text-oriented learners could get more written explanations. The result is an educational experience that plays to each student's strengths while supporting their areas of difficulty.</p>
      
      <h2>Intelligent Tutoring and Feedback</h2>
      <p>AI-powered tutoring systems can provide immediate, specific feedback that goes beyond simply marking answers as correct or incorrect. These systems can identify misconceptions, suggest targeted remediation, and explain concepts in multiple ways until the student achieves understanding.</p>
      <p>For complex subjects, AI tutors can break down problems into manageable steps, providing guidance at each point of difficulty while still allowing students to discover solutions independently when possible – mimicking the scaffolding approach of effective human teachers.</p>
      
      <h2>Predictive Analytics for Proactive Support</h2>
      <p>Perhaps most powerfully, AI systems can predict learning difficulties before they become serious obstacles. By analyzing patterns across thousands of learners, these systems identify early warning signs that a student may struggle with upcoming concepts or lose engagement with the course.</p>
      <p>This predictive capability allows for proactive intervention – providing additional support, alternative explanations, or motivational elements precisely when needed, rather than after a student has already fallen behind or become discouraged.</p>
      
      <h2>Balancing Personalization with Human Connection</h2>
      <p>While AI offers remarkable capabilities for personalization, the most effective educational approaches combine these technological advantages with human elements. Instructor guidance, peer collaboration, and community engagement remain essential components of a complete learning experience.</p>
      <p>The ideal implementation uses AI to handle personalized content delivery and skill practice, freeing human educators to focus on motivation, mentorship, and the social-emotional aspects of learning that remain uniquely human strengths.</p>
      
      <h2>Conclusion</h2>
      <p>As AI technology continues to advance, its ability to create truly personalized learning experiences will only grow more sophisticated. The potential benefits – improved learning outcomes, increased engagement, and education tailored to individual needs and goals – represent a significant evolution in how we approach teaching and learning.</p>
    `,
    author: 'James Wilson',
    authorBio: 'James Wilson is an AI researcher specializing in educational applications. He has contributed to several adaptive learning platforms and studies the intersection of artificial intelligence and pedagogical best practices.',
    authorImage: '/images/author-5.jpg',
    date: 'April 15, 2023',
    readTime: '9 min read',
    category: 'Technology',
    tags: ['AI', 'Personalized Learning', 'EdTech'],
    image: '/images/blog-5.jpg',
    featured: false
  },
  {
    id: 6,
    title: 'Essential Soft Skills Every Technical Professional Should Develop',
    excerpt: 'Technical skills alone aren\'t enough in today\'s workplace. Learn about the crucial soft skills that can accelerate your career growth.',
    content: `
      <p>In the technical world, there's often an overwhelming focus on hard skills – programming languages, frameworks, tools, and technical methodologies. While these skills are undoubtedly essential, they represent only half of the equation for career success. The other half – soft skills – can be the differentiating factor that propels your career forward.</p>
      
      <h2>Communication: The Foundation of Professional Success</h2>
      <p>Perhaps no soft skill is more valuable than the ability to communicate effectively. Technical professionals must translate complex concepts for non-technical stakeholders, write clear documentation, and articulate their ideas and solutions persuasively.</p>
      <p>Strong communicators can bridge the gap between technical and business teams, ensuring that technical solutions align with organizational goals and that all stakeholders understand the value and limitations of technical work.</p>
      
      <h2>Emotional Intelligence in Technical Environments</h2>
      <p>Emotional intelligence – the ability to recognize, understand, and manage emotions in yourself and others – plays a crucial role in workplace dynamics. Technical professionals with high emotional intelligence can navigate team conflicts, provide constructive feedback, and build strong collaborative relationships.</p>
      <p>This skill becomes increasingly important as you advance in your career and take on leadership responsibilities, where understanding team dynamics and motivating diverse individuals becomes central to your role.</p>
      
      <h2>Adaptability and Continuous Learning</h2>
      <p>The technical landscape evolves at a breathtaking pace, making adaptability an essential trait. Beyond simply learning new technologies, adaptability encompasses embracing changing project requirements, shifting priorities, and evolving methodologies.</p>
      <p>Professionals who approach change with curiosity rather than resistance position themselves as valuable assets in organizations navigating digital transformation and rapid technological advancement.</p>
      
      <h2>Problem-Solving Beyond Technical Solutions</h2>
      <p>While technical professionals are often skilled at solving technical problems, expanding your problem-solving approach to include business, process, and people challenges can significantly increase your impact.</p>
      <p>This broader perspective allows you to identify root causes rather than symptoms, consider multiple solution approaches, and anticipate downstream effects of proposed changes – leading to more comprehensive and effective solutions.</p>
      
      <h2>Time Management and Prioritization</h2>
      <p>In environments with competing demands and shifting priorities, the ability to manage your time effectively and focus on high-impact work becomes invaluable. This includes setting realistic timelines, communicating constraints, and making thoughtful decisions about where to invest your effort.</p>
      <p>Professionals who master this skill deliver consistent results while maintaining sustainable work practices and avoiding burnout – a common challenge in technical fields.</p>
      
      <h2>Leadership at Every Level</h2>
      <p>Leadership isn't confined to management roles. Technical professionals can demonstrate leadership by mentoring colleagues, championing best practices, taking initiative on projects, and advocating for improvements to processes and tools.</p>
      <p>These leadership behaviors not only contribute to team success but also increase your visibility and demonstrate your readiness for formal leadership positions when those opportunities arise.</p>
      
      <h2>Developing Your Soft Skills</h2>
      <p>Unlike technical skills, which can often be learned through structured courses and practice, soft skills typically develop through experience, reflection, and deliberate effort over time. Seek feedback from colleagues, look for opportunities to practice these skills in low-stakes situations, and consider finding a mentor who exemplifies the qualities you wish to develop.</p>
      <p>Remember that developing soft skills is a continuous journey rather than a destination – even the most seasoned professionals continue to refine these abilities throughout their careers.</p>
      
      <h2>Conclusion</h2>
      <p>In a competitive technical landscape where many professionals possess similar hard skills, your soft skills can become your career superpower. By intentionally developing these abilities alongside your technical expertise, you'll position yourself for greater impact, leadership opportunities, and long-term career success.</p>
    `,
    author: 'Lisa Thompson',
    authorBio: 'Lisa Thompson is a technical leadership coach who helps engineers and developers transition into leadership roles. With a background in software development and organizational psychology, she bridges technical and interpersonal skill development.',
    authorImage: '/images/author-6.jpg',
    date: 'March 28, 2023',
    readTime: '7 min read',
    category: 'Career Development',
    tags: ['Soft Skills', 'Professional Development', 'Career Growth'],
    image: '/images/blog-6.jpg',
    featured: false
  },
];

// Related posts function
const getRelatedPosts = (currentPostId: number, currentTags: string[], currentCategory: string): BlogPost[] => {
  return blogPosts
    .filter(post => {
      // Exclude current post
      if (post.id === currentPostId) return false;
      
      // Check for matching tags or category
      const hasMatchingTag = post.tags.some(tag => currentTags.includes(tag));
      const hasMatchingCategory = post.category === currentCategory;
      
      return hasMatchingTag || hasMatchingCategory;
    })
    .slice(0, 3); // Get up to 3 related posts
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // Find the post with the matching ID
    const postId = parseInt(params.id as string);
    const foundPost = blogPosts.find(p => p.id === postId);
    
    if (foundPost) {
      setPost(foundPost);
      // Get related posts
      const related = getRelatedPosts(postId, foundPost.tags, foundPost.category);
      setRelatedPosts(related);
    } else {
      // Redirect to blog page if post not found
      router.push('/blog');
    }
  }, [params.id, router]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-primary mb-4">Loading...</h1>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Link href="/blog" className="text-primary flex items-center hover:underline">
          <ArrowLeft size={18} className="mr-2" /> Back to Blog
        </Link>
      </div>
      
      {/* Blog Post Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center text-gray-500 text-sm mb-8">
          <div className="flex items-center mr-6">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image 
                src={post.authorImage} 
                alt={post.author}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="font-medium text-gray-800">{post.author}</span>
          </div>
          <div className="flex items-center mr-6">
            <Calendar size={16} className="mr-2" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            {post.readTime}
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-12">
        <Image 
          src={post.image} 
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Blog Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <article className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag size={18} className="text-gray-500" />
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Share and Bookmark */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-6 mb-12">
            <div className="flex items-center gap-6">
              <button className="flex items-center text-gray-700 hover:text-primary">
                <ThumbsUp size={20} className="mr-2" />
                Like
              </button>
              <button className="flex items-center text-gray-700 hover:text-primary">
                <Share2 size={20} className="mr-2" />
                Share
              </button>
              <button className="flex items-center text-gray-700 hover:text-primary">
                <Bookmark size={20} className="mr-2" />
                Save
              </button>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="bg-light-gray p-8 rounded-xl mb-12">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={post.authorImage} 
                  alt={post.author}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">About {post.author}</h3>
                <p className="text-gray-700 mb-4">{post.authorBio}</p>
                <div className="flex gap-3">
                  <a href="#" className="text-primary hover:underline">More Articles</a>
                  <a href="#" className="text-primary hover:underline">Follow</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Related Posts */}
          <div className="bg-white p-6 rounded-xl shadow-custom mb-8">
            <h3 className="text-xl font-bold text-primary mb-6">Related Articles</h3>
            
            <div className="space-y-6">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      width={80}
                      height={80}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1 line-clamp-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-primary">
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar size={12} className="mr-1" />
                      {relatedPost.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Link href="/blog" className="text-primary flex items-center hover:underline">
                View All Articles <ArrowLeft size={16} className="ml-2 rotate-180" />
              </Link>
            </div>
          </div>
          
          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow-custom mb-8">
            <h3 className="text-xl font-bold text-primary mb-6">Categories</h3>
            
            <ul className="space-y-3">
              {['Education', 'Learning Tips', 'Teaching Methods', 'Success Stories', 'Technology', 'Career Development'].map(category => (
                <li key={category}>
                  <Link href={`/blog?category=${category}`} className="text-gray-700 hover:text-primary flex items-center justify-between">
                    {category}
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {blogPosts.filter(p => p.category === category).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Popular Tags */}
          <div className="bg-white p-6 rounded-xl shadow-custom">
            <h3 className="text-xl font-bold text-primary mb-6">Popular Tags</h3>
            
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map(tag => (
                <Link key={tag} href={`/blog?tag=${tag}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <section className="mt-16 mb-8">
        <div className="bg-primary text-white rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg mb-0 max-w-2xl">
                Stay updated with our latest articles, learning resources, and course announcements.
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 border border-white/20"
                  required
                />
                <button type="submit" className="btn bg-white text-primary hover:bg-gray-100 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}