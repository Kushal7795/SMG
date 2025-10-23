import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// UPDATED FORMSPREE ENDPOINT URL
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldpyvng"; 

export const EnquiryForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  // Helper function to handle Select component changes
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, interest: value });
  };

  // ✅ FIX: Explicitly type the event to React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // The type casting here is no longer needed because the function argument 
      // is correctly typed, but we'll include it for safety just in case the Select 
      // component implementation adds unexpected complexity.
      const data = new FormData(e.currentTarget);
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: 'Enquiry Submitted Successfully! 🎉',
          description: 'Our team has received your message and will contact you within 24 hours.',
          variant: 'default',
        });
        
        // Reset form fields
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          interest: '',
          message: '',
        });

      } else {
        // Handle server-side errors
        toast({
          title: 'Submission Failed',
          description: 'There was an issue submitting your enquiry. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      // Handle network errors
      console.error('Network Error:', error);
      toast({
        title: 'Error',
        description: 'A network error occurred. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            {t('enquiry.title')}
          </h2>
          <p className="text-xl text-muted-foreground">{t('enquiry.subtitle')}</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-12 space-y-6 hover-glow"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base">
                {t('enquiry.fullName')}
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-input/50 border-border focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                {t('enquiry.email')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-input/50 border-border focus:border-primary transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base">
                {t('enquiry.phone')}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-input/50 border-border focus:border-primary transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Interest */}
            <div className="space-y-2">
              <Label htmlFor="interest" className="text-base">
                {t('enquiry.interest')}
              </Label>
              <Select
                value={formData.interest}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger name="interest-display" className="bg-input/50 border-border focus:border-primary transition-colors">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="courses">
                    {t('enquiry.interests.courses')}
                  </SelectItem>
                  <SelectItem value="bootcamp">
                    {t('enquiry.interests.bootcamp')}
                  </SelectItem>
                  <SelectItem value="degree">
                    {t('enquiry.interests.degree')}
                  </SelectItem>
                  <SelectItem value="certification">
                    {t('enquiry.interests.certification')}
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* Hidden input to ensure Formspree captures the final 'interest' value */}
              <input type="hidden" name="interest" value={formData.interest} /> 
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-base">
                {t('enquiry.message')}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-input/50 border-border focus:border-primary transition-colors resize-none"
                placeholder="Tell us about your learning goals..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-glow text-lg py-6 transition-all"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                t('enquiry.submit')
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};