<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerModule extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'cust_id',
        'module_id',
        'is_active',
        'granted_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cust_id', 'cust_id');
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

    public function grantor()
    {
        return $this->belongsTo(User::class, 'granted_by');
    }
}
