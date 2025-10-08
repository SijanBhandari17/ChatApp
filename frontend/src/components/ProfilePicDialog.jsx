import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserPen } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/axiosConfig';
import useAuth from '@/stores/authStore';

const ProfilePicDialog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const { updateUser } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    setIsSubmitting(true);
    setError(''); // Clear previous errors
    try {
      const formData = new FormData();
      formData.append('profileImage', selectedFile);
      const response = await api.post('/upload/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOpen(false);
      setSelectedFile(null);
      updateUser(response.data.url);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl('');
      console.log(response);
    } catch (err) {
      setError(err.response?.data?.error);
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
    console.log(selectedFile);
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setError('');
    console.log(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
  };
  const handleOpenChange = newOpen => {
    setOpen(newOpen);
    if (!newOpen) {
      handleCancel();
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={e => e.preventDefault()}
          className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <UserPen className="mr-2 h-4 w-4" />
          Change Profile Picture
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-[425px]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader className="mb-4">
            <DialogTitle>Change Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {previewUrl && (
              <div className="flex justify-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={previewUrl} className="object-cover" alt="Preview" />
                  <AvatarFallback>Preview</AvatarFallback>
                </Avatar>
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="profile_image">Select an image</Label>
              <Input
                type="file"
                onChange={handleFileChange}
                id="profile_image"
                accept="image/*"
                name="profileImage"
              />
            </div>
            {error && <div className="text-destructive text-sm">{error}</div>}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!selectedFile || isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Change Profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePicDialog;
