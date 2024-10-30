"use client"
import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code, Coffee, User, Mail, Github, Linkedin, FileText,GitBranch, Cpu, Lightbulb } from 'lucide-react'
import Head from 'next/head'

export default function JavaLearningBlog() {
  const [activeTab, setActiveTab] = useState('introduction')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const blogPosts = [
    { id: 'introduction', title: 'Introduction to Java', icon: BookOpen },
    { id: 'syntax', title: 'Java Syntax Basics', icon: Code },
    { id: 'oop', title: 'Object-Oriented Programming in Java', icon: Coffee },
  ]
  const articles = [
    { 
      id: 1, 
      title: 'Java基础入门', 
      link: '/articles/java-basics',
      date: '2024-03-20'
    },
    { 
      id: 2, 
      title: 'Java面向对象编程', 
      link: '/articles/java-oop',
      date: '2024-03-21'
    },
    // 可以添加更多文章
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.1

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1

        this.opacity = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.2 + 0.3
      }

      draw() {
        if (!ctx) return
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(0, 64, 77, 0.5)')
      gradient.addColorStop(1, 'rgba(230, 100, 40, 0.5)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      
      // Draw flowing lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const y = canvas.height / 5 * i
        ctx.moveTo(0, y)
        for (let x = 0; x < canvas.width; x += 20) {
          ctx.lineTo(x, y + Math.sin(Date.now() * 0.001 + x * 0.01) * 20)
        }
      }
      ctx.stroke()
      
      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-900 via-teal-700 to-orange-500">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 min-h-screen p-8">
        <header className="mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-orange-300 pb-2 relative flex items-center">
            <Cpu className="mr-4 text-teal-300" size={48} />
             Java Learning Journey
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-300 to-orange-300"></span>
          </h1>
          
        </header>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <nav className="flex flex-wrap gap-4 mb-8">
              {blogPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setActiveTab(post.id)}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                    activeTab === post.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-teal-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <post.icon className="mr-2" size={18} />
                  {post.title}
                </button>
              ))}
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl"
              >
                <h2 className="text-3xl font-bold mb-4 text-white flex items-center">
                  {(() => {
                    const post = blogPosts.find((post) => post.id === activeTab);
                    const Icon = post?.icon;
                    return (
                      <>
                        {Icon && <Icon className="mr-2" size={24} />}
                        {post?.title}
                      </>
                    );
                  })()}
                </h2>
                <p className="text-lg text-teal-100">
                  This is where your Java learning content for {activeTab} would go. The enhanced dynamic background creates an
                  immersive and futuristic learning environment, inspiring you to dive deep into the world of Java
                  programming. Explore the topics, experiment with code, and embark on your coding adventure!
                </p>
              </motion.div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <FileText className="mr-2" size={24} />
                  code example
                </h3>
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-green-400">
                    {`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java Learner!");
    }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center">
              <User className="mr-2" size={24} />
              personal profile
            </h2>
            <div className="space-y-4">
              <div className="flex items-center text-teal-100">
                <User className="mr-2" size={18} />
                <span>孙乐乐</span>
              </div>
              <div className="flex items-center text-teal-100">
                <Mail className="mr-2" size={18} />
                <span>775131260@qq.com</span>
              </div>
              <div className="flex items-center text-teal-100">
                <Github className="mr-2" size={18} />
                <a href="https://github.com/superscholar9" className="hover:underline">github.com/superscholar9</a>
              </div>
              <div className="flex items-center text-teal-100">
                <GitBranch className="mr-2" size={18} />
                <a href="https://gitee.com/miaomiaosun" className="hover:underline">gitee.com/superscholar9</a>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
                  <Lightbulb className="mr-2" size={20} />
                  about me
                </h3>
                <p className="text-teal-100">
                  Passionate about Java development with 5 years of experience. Enthusiastic about sharing knowledge and helping others learn programming.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
    <h2 className="text-3xl font-bold mb-4 text-white flex items-center">
      <FileText className="mr-2" size={24} />
      recent articles
    </h2>
    <div className="h-0.5 bg-gradient-to-r from-teal-300 to-orange-300 mb-4" />
    <div className="space-y-4">
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.link}
          className="block hover:bg-white hover:bg-opacity-10 p-3 rounded-lg transition-colors"
        >
          <div className="flex justify-between items-center text-teal-100">
            <span className="text-lg hover:text-white transition-colors">
              {article.title}
            </span>
            <span className="text-sm opacity-70">{article.date}</span>
          </div>
        </a>
      ))}
    </div>
            </div>
          </div>
        </div>
      </div>
    )
}