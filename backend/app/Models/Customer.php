<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $primaryKey = 'cust_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'cust_id',
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'gst_number',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'cust_id', 'cust_id');
    }

    public function customerModules()
    {
        return $this->hasMany(CustomerModule::class, 'cust_id', 'cust_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'cust_id', 'cust_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'cust_id', 'cust_id');
    }

    public function departments()
    {
        return $this->hasMany(Department::class, 'cust_id', 'cust_id');
    }
}
