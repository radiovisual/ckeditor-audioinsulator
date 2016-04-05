# Always prefer setuptools over distutils
from setuptools import setup

setup (
    name='ckeditor-audioinsulator',
    version='0.0.1',
    description='Embed contextMenu/metadata-friendly audio tags into CKEditor.',
    author='Michael Wuergler',
    author_email='senjudev@gmail.com',
    url='https://github.com/radiovisual/ckeditor-audioinsulator',
    long_description='Embed contextMenu/metadata-friendly audio tags into CKEditor.',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: POSIX',
        'Programming Language :: JavaScript',
        'Topic :: Software Development :: Libraries',
    ],
    zip_safe=False
)